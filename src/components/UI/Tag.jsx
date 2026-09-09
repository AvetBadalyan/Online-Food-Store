import { GiChiliPepper } from 'react-icons/gi';
import { TbLeaf } from 'react-icons/tb';
import { MdStar } from 'react-icons/md';
import styles from './Tag.module.css';

const TAG_ICONS = {
  bestseller: <MdStar size={11} />,
  spicy: <GiChiliPepper size={11} />,
  vegan: <TbLeaf size={11} />,
  vegetarian: <TbLeaf size={11} />,
};

export default function Tag({ type }) {
  if (!styles[type]) return null;
  return (
    <span className={`${styles.tag} ${styles[type]}`}>
      {TAG_ICONS[type]}
      {type}
    </span>
  );
}
