import styles from './Input.module.css'

function Input({
    type,
    text,
    name,
    placeholder,
    handleOnChange,     //handleOnChange é provavelmente o nome de uma função que trata um evento de mudança (onChange) em um elemento de formulário, como uma entrada de texto (input), uma caixa de seleção (checkbox), etc., em uma aplicação React.
    value,
    multiple,
}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            < input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                {...(multiple ? { multiple } : '')} //{...}: Este parece ser um spread operator ({...}). Ele é usado para expandir os elementos de um objeto ou array. multiple ? { multiple } : '': Esta é uma expressão condicional ternária. Ela tem três partes: multiple: Isso é a condição que está sendo testada. Se multiple for avaliado como verdadeiro, a expressão antes do : é retornada, caso contrário, a expressão após o : é retornada.{ multiple }: Se a condição multiple for verdadeira, isso retornará um objeto contendo uma propriedade chamada multiple com o valor de multiple. Caso contrário, será um objeto vazio {}.'': Se a condição multiple for falsa, isso retornará uma string vazia. />
            />
        </div>
    )
}

export default Input