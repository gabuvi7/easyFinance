import loadingStyles from './Loading.module.css';

function Loading() {
  return (
    <div className={loadingStyles.loadingScreen}>
      <div className={loadingStyles.dot} />
      <div className={loadingStyles.dot} />
      <div className={loadingStyles.dot} />
      <div className={loadingStyles.dot} />
      <div className={loadingStyles.dot} />
    </div>
  );
}
export default Loading;
