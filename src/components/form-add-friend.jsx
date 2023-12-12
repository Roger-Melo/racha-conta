const FormAddFriend = ({ onSubmitAddFriend }) => {
  const handleSubmit = e => {
    e.preventDefault()
    const { nameOfFriend, imgOfFriend } = e.target.elements
    const newFriend = { id: crypto.randomUUID(), name: nameOfFriend.value, balance: 0, img: imgOfFriend.value }
    onSubmitAddFriend(newFriend)
  }

  return (
    <form onSubmit={handleSubmit} className="form-add-friend">
      <label>
        🧍🏻‍♂️ Nome
        <input name="nameOfFriend" />
      </label>
      <label>
        📷 Foto
        <input name="imgOfFriend" />
      </label>
      <button className="button">Adicionar</button>
    </form>
  )
}

export { FormAddFriend }