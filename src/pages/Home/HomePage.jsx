import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
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

export default function HomePage() {
	const { meals } = useMeals()
	const [searchParams, setSearchParams] = useSearchParams()

	const [search, setSearch] = useState('')
	const [sortBy, setSortBy] = useState('default')
	const menuRef = useRef(null)

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
	}

	function scrollToMenu() {
		menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

	return (
		<div className={styles.page}>
			<Hero onScrollToMenu={scrollToMenu} />

			<section ref={menuRef} aria-label="Meal menu">
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
									onChange={e => setSearch(e.target.value)}
									className={styles.searchInput}
									aria-label="Search meals"
								/>
								{search && (
									<button
										className={styles.clearBtn}
										onClick={() => setSearch('')}
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
								onChange={e => setSortBy(e.target.value)}
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
									className={styles.clearFiltersBtn}
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
						<motion.div className={styles.grid} layout>
							<AnimatePresence mode="popLayout">
								{filtered.map(meal => (
									<MealCard key={meal.id} meal={meal} />
								))}
							</AnimatePresence>
						</motion.div>
					)}
				</div>
			</section>
		</div>
	)
}
