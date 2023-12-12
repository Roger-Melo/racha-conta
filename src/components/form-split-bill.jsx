import { useEffect } from 'react'

const FormSplitBill = ({ selectedFriend, onSubmitShareBill }) => {
  useEffect(() => {
    document.title = `${selectedFriend.name} foi selecionado(a)`
    return () => document.title = 'Racha-conta'
  }, [selectedFriend.name])

  const handleSubmitShareBill = e => {
    e.preventDefault()
    const { totalBill, mySpend, whoWillPay } = e.target.elements
    onSubmitShareBill({
      ...selectedFriend,
      balance: whoWillPay.value === 'you'
        ? selectedFriend.balance + (+totalBill.value - +mySpend.value)
        : selectedFriend.balance - +mySpend.value
    })
  }

  return (
    <form onSubmit={handleSubmitShareBill} className="form-split-bill">
      <h2>Rache a conta com {selectedFriend.name}</h2>
      <label>
        💰 Valor total
        <input name="totalBill" type="number" />
      </label>
      <label>
        🤸🏻‍♂️ Seus gastos
        <input name="mySpend" type="number" />
      </label>
      <label>
        🤑 Quem vai pagar
        <select name="whoWillPay">
          <option value="you">Você</option>
          <option value={selectedFriend.name}>{selectedFriend.name}</option>
        </select>
      </label>
      <button className="button">Rachar conta</button>
    </form>
  )
}

export { FormSplitBill }