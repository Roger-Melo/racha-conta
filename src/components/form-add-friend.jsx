import { useState } from 'react'

const FormAddFriend = ({ showFormAddFriend, onSubmitAddFriend }) => {
  const [nameOfFriend, setNameOfFriend] = useState('')
  const [imgOfFriend, setImgOfFriend] = useState('')

  const handleChangeNameOfFriend = e => setNameOfFriend(e.target.value)
  const handleChangeImgOfFriend = e => setImgOfFriend(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    const newFriend = { id: crypto.randomUUID(), name: nameOfFriend, balance: 0, img: imgOfFriend }

    onSubmitAddFriend(newFriend)
    setNameOfFriend('')
    setImgOfFriend('')
  }

  return showFormAddFriend &&
    <form onSubmit={handleSubmit} className="form-add-friend">
      <label>
        🧍🏻‍♂️ Nome
        <input value={nameOfFriend} onChange={handleChangeNameOfFriend} />
      </label>
      <label>
        📷 Foto
        <input value={imgOfFriend} onChange={handleChangeImgOfFriend} />
      </label>
      <button className="button">Adicionar</button>
    </form>
}

export { FormAddFriend }