import styles from "@/app/page.module.scss"
import { LoginForm } from "@/components/login-form.tsx"

export const metadata = {
  //todo better meta with images, graph
  title: "Login",
  description: "",
}

export default function Login() {
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  )
}
