import styles from "./Container.module.css";

function Container({children}) {
  return <main className={styles.container}>
      {children}
  </main>
}


// {children}: Isso é a parte central do JSX. {}é usado para interpolação no JSX, permitindo a inserção de expressões JavaScript. Neste caso, childrenestá sendo usado para renderizar os elementos filhos do componente Containerdentro do elemento <main>. Esses filhos serão passados ​​para o componente quando forem usados ​​em outro lugar da aplicação.

export default Container