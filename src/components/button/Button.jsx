import styles from './styles.module.css';

export const Button = ({className="", children, ...props}) => {
  return (
    <button 
      className={`btn-reset ${className} ${styles.btn}`} 
      {...props}
    >
      {children}
    </button>
  );
};
