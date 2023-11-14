import { useState } from 'react'

const FormSplitBill = ({ selectedFriend, onSubmitShareBill }) => {
  const [totalBill, setTotalBill] = useState('')
  const [mySpend, setMySpend] = useState('')
  const [whoWillPay, setWhoWillPay] = useState('you')

  const handleChangeBill = e => setTotalBill(e.target.value)
  const handleChangeMySpend = e => setMySpend(e.target.value)
  const handleChangeWhoWillPay = e => setWhoWillPay(e.target.value)

  const handleSubmitShareBill = e => {
    e.preventDefault()
    onSubmitShareBill({
      ...selectedFriend,
      balance: whoWillPay === 'you'
        ? selectedFriend.balance + (+totalBill - +mySpend)
        : selectedFriend.balance - +mySpend
    })

    setTotalBill('')
    setMySpend('')
    setWhoWillPay('you')
  }

  return selectedFriend &&
    <form onSubmit={handleSubmitShareBill} className="form-split-bill">
      <h2>Rache a conta com {selectedFriend.name}</h2>
      <label>
        💰 Valor total
        <input value={totalBill} onChange={handleChangeBill} type="number" />
      </label>
      <label>
        🤸🏻‍♂️ Seus gastos
        <input value={mySpend} onChange={handleChangeMySpend} type="number" />
      </label>
      <label>
        🤑 Quem vai pagar
        <select value={whoWillPay} onChange={handleChangeWhoWillPay}>
          <option value='you'>Você</option>
          <option value={selectedFriend.name}>{selectedFriend.name}</option>
        </select>
      </label>
      <button className="button">Rachar conta</button>
    </form>
}

export { FormSplitBill }