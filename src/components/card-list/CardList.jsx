import Card from '../card';
import { Skeleton } from '../skeleton/Skeleton';
import styles from './styles.module.css';

const CardList = ({ data, loading }) => {
  return (
    <ul className={`list-reset ${styles.cards}`}>
      {!loading && data.map((item) => (
        <Card key={item.code} item={item} />
      ))}
      {loading && Array.from({ length: 6 }).map((_, i) => {
        return <Skeleton variant={'card'} key={i} />;
      })}
    </ul>
  );
};

export default CardList;
