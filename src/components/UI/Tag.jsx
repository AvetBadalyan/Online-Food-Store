import { GiChiliPepper } from 'react-icons/gi'
import { MdStar } from 'react-icons/md'
import { TbLeaf } from 'react-icons/tb'
import styles from './Tag.module.css'

const TAG_CONFIG = {
	bestseller: { icon: MdStar, size: 11 },
	spicy: { icon: GiChiliPepper, size: 11 },
	vegan: { icon: TbLeaf, size: 11 },
	vegetarian: { icon: TbLeaf, size: 11 }
}

export default function Tag({ type }) {
	const config = TAG_CONFIG[type]
	if (!config || !styles[type]) return null

	const Icon = config.icon

	return (
		<span className={`${styles.tag} ${styles[type]}`}>
			<Icon size={config.size} />
			{type}
		</span>
	)
}
