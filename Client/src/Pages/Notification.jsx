import styles from '../Styles/Navbar/Notification.module.css';
export const Notification = () => {
  return (
    <div className={styles.noti_main_container}>
            <div className={styles.noti_inner_container}>
                <h2>Notifications</h2>
                <div className={styles.noti_content}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptatum.</p>
                </div>
            </div>
    </div>
  )
}

