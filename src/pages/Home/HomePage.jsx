import { useMemo, useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { MdOutlineDinnerDining } from 'react-icons/md'
import { useSearchParams } from 'react-router-dom'
import Hero from '../../components/Layout/Hero'
import MealCard from '../../components/MealCard/MealCard'
import EmptyState from '../../components/UI/EmptyState'
import { CATEGORIES } from '../../data/meals'
import { useMeals } from '../../hooks/useMeals'
import styles from './HomePage.module.css'

const SORT_OPTIONS = [
	{ value: 'default', label: 'Featured' },
	{ value: 'price-asc', label: 'Price: Low → High' },
	{ value: 'price-desc', label: 'Price: High → Low' },
	{ value: 'rating-desc', label: 'Top Rated' },
	{ value: 'name-asc', label: 'A → Z' }
]

const PAGE_SIZE = 8

export default function HomePage() {
	const { meals } = useMeals()
	const [searchParams, setSearchParams] = useSearchParams()

	const [search, setSearch] = useState('')
	const [sortBy, setSortBy] = useState('default')
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

	// Category from URL param (Footer links use ?category=X)
	const urlCategory = searchParams.get('category') ?? 'All'
	const activeCategory = CATEGORIES.includes(urlCategory) ? urlCategory : 'All'

	function setCategory(cat) {
		if (cat === 'All') {
			searchParams.delete('category')
		} else {
			searchParams.set('category', cat)
		}
		setSearchParams(searchParams, { replace: true })
		setVisibleCount(PAGE_SIZE) // reset on category change
	}

	// Filter + sort — all in-memory, no network call
	const filtered = useMemo(() => {
		let result = [...meals]

		if (activeCategory !== 'All') {
			result = result.filter(m => m.category === activeCategory)
		}

		if (search.trim()) {
			const q = search.toLowerCase()
			result = result.filter(
				m =>
					m.name.toLowerCase().includes(q) ||
					m.description.toLowerCase().includes(q) ||
					m.category.toLowerCase().includes(q)
			)
		}

		switch (sortBy) {
			case 'price-asc':
				result.sort((a, b) => a.price - b.price)
				break
			case 'price-desc':
				result.sort((a, b) => b.price - a.price)
				break
			case 'rating-desc':
				result.sort((a, b) => b.rating - a.rating)
				break
			case 'name-asc':
				result.sort((a, b) => a.name.localeCompare(b.name))
				break
			default:
				break
		}

		return result
	}, [meals, activeCategory, search, sortBy])

	// Reset visible count when search or sort changes
	const visibleMeals = filtered.slice(0, visibleCount)
	const hasMore = visibleCount < filtered.length

	function handleSearchChange(e) {
		setSearch(e.target.value)
		setVisibleCount(PAGE_SIZE)
	}

	function handleSortChange(e) {
		setSortBy(e.target.value)
		setVisibleCount(PAGE_SIZE)
	}

	// Load more — just extend the visible slice, no scroll manipulation
	function handleLoadMore() {
		setVisibleCount(c => c + PAGE_SIZE)
	}

	return (
		<div className={styles.page}>
			<Hero />

			<section id="menu" aria-label="Meal menu">
				<div className="container">
					<div className={styles.controls}>
						{/* Top row: title + search */}
						<div className={styles.topRow}>
							<h2 className={styles.sectionTitle}>
								Our <span>Menu</span>
							</h2>

							<div className={styles.searchWrapper}>
								<span className={styles.searchIcon}>
									<FiSearch size={16} />
								</span>
								<input
									type="search"
									placeholder="Search dishes…"
									value={search}
									onChange={handleSearchChange}
									className={styles.searchInput}
									aria-label="Search meals"
								/>
								{search && (
									<button
										className={styles.clearBtn}
										onClick={() => {
											setSearch('')
											setVisibleCount(PAGE_SIZE)
										}}
										aria-label="Clear search"
									>
										<FiX size={15} />
									</button>
								)}
							</div>
						</div>

						{/* Category pills */}
						<div className={styles.categories} role="tablist" aria-label="Filter by category">
							{CATEGORIES.map(cat => (
								<button
									key={cat}
									role="tab"
									aria-selected={cat === activeCategory}
									className={`${styles.pill} ${cat === activeCategory ? styles.pillActive : ''}`}
									onClick={() => setCategory(cat)}
								>
									{cat}
								</button>
							))}
						</div>

						{/* Results meta + sort */}
						<div className={styles.meta}>
							<span className={styles.resultCount}>
								{filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'}
								{activeCategory !== 'All' && ` in ${activeCategory}`}
								{search && ` matching "${search}"`}
							</span>
							<select
								className={styles.sortSelect}
								value={sortBy}
								onChange={handleSortChange}
								aria-label="Sort meals"
							>
								{SORT_OPTIONS.map(opt => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Grid */}
					{filtered.length === 0 ? (
						<EmptyState
							icon={<MdOutlineDinnerDining />}
							title="No dishes found"
							description={
								search
									? `No results for "${search}". Try a different search or category.`
									: `No dishes in ${activeCategory} yet.`
							}
							action={
								<button
									className={`${styles.pill} ${styles.clearFiltersBtn}`}
									onClick={() => {
										setSearch('')
										setCategory('All')
									}}
								>
									Clear filters
								</button>
							}
						/>
					) : (
						<>
							<div className={styles.grid}>
								{visibleMeals.map(meal => (
									<MealCard key={meal.id} meal={meal} />
								))}
							</div>

							{hasMore && (
								<div className={styles.loadMore}>
									<button className={styles.loadMoreBtn} onClick={handleLoadMore}>
										Load more ({filtered.length - visibleCount} remaining)
									</button>
								</div>
							)}
						</>
					)}
				</div>
			</section>
		</div>
	)
}
