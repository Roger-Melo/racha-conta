import { useEffect } from 'react'
import { Form } from './shared/form'
import { Field } from './shared/field'
import { Button } from './shared/button'

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
    <Form onSubmit={handleSubmitShareBill} className="p-[3.2rem_4rem]">
      <h2 className="text-[2.2rem] mb-[1.6rem] font-semibold">Rache a conta com {selectedFriend.name}</h2>
      <Field labelText="💰 Valor total" inputName="totalBill" inputType="number" />
      <Field labelText="🤸🏻‍♂️ Seus gastos" inputName="mySpend" inputType="number" />
      <Field labelText="🤑 Quem vai pagar">
        <select name="whoWillPay" className="text-dark-gray-blue text-2xl p-[.7rem] rounded-[4px] mb-2">
          <option value="you">Você</option>
          <option value={selectedFriend.name}>{selectedFriend.name}</option>
        </select>
      </Field>
      <Button className="bg-light-green">Rachar conta</Button>
    </Form>
  )
}

export { FormSplitBill }
