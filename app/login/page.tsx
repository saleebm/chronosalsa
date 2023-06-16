import styles from "../page.module.css"
import { LoginForm } from "@/components/login-form"

export const metadata = {
  //todo better meta with images, graph
  title: 'Login',
  description:
    "",
}

export default function Login() {
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  )
}
