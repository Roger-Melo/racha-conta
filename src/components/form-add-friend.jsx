import { Form } from './shared/form'
import { Field } from './shared/field'
import { Button } from './shared/button'

const FormAddFriend = ({ onSubmitAddFriend }) => {
  const handleSubmit = e => {
    e.preventDefault()
    const { nameOfFriend, imgOfFriend } = e.target.elements
    const newFriend = { id: crypto.randomUUID(), name: nameOfFriend.value, balance: 0, img: imgOfFriend.value }
    onSubmitAddFriend(newFriend)
  }

  return (
    <Form onSubmit={handleSubmit} className="mb-[1.6rem] p-[1.2rem]">
      <Field labelText="🧍🏻‍♂️ Nome" inputName="nameOfFriend" inputType="text" />
      <Field labelText="📷 Foto" inputName="imgOfFriend" inputType="url" />
      <Button className="bg-light-green">Adicionar</Button>
    </Form>
  )
}

export { FormAddFriend }
