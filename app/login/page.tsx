import styles from "../page.module.css"

export const metadata = {
  //todo better meta with images, graph
  title: 'Login',
  description:
    "",
}

export default function Login() {
  return (
    <main className={styles.main}>
        <h1>Login</h1>
        <a href={'/api/authorize-spotify'}>Authorize Spotify</a>
    </main>
  )
}
