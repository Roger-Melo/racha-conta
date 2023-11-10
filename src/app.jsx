import { useState } from 'react'

const initialFriends = [
  { id: crypto.randomUUID(), name: 'André', balance: -7, img: 'friends/andre-48.jpg' },
  { id: crypto.randomUUID(), name: 'Pri', balance: 20, img: 'friends/pri-48.jpg' },
  { id: crypto.randomUUID(), name: 'Dú', balance: 0, img: 'friends/du-48.jpg' }
]

const getMsgInfo = balance => balance < 0
  ? { message: `Você deve ${Math.abs(balance)} reais`, color: 'red-debit' }
  : balance > 0
    ? { message: `Te deve ${balance} reais`, color: 'green-credit' }
    : { message: 'Estão quites', color: 'white-neutral' }

const App = () => {
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [totalBill, setTotalBill] = useState('100')
  const [mySpend, setMySpend] = useState('50')
  const [whoWillPay, setWhoWillPay] = useState('you')

  const handleClickFriend = friend => setSelectedFriend(p => p?.id === friend.id ? null : friend)
  const handleChangeBill = e => setTotalBill(e.target.value)
  const handleChangeMySpend = e => setMySpend(e.target.value)
  const handleChangeWhoWillPay = e => setWhoWillPay(e.target.value)

  const handleSubmitShareBill = e => {
    e.preventDefault()
    setFriends(prev => prev.map(friend => selectedFriend.id === friend.id
      ? {
        ...friend,
        balance: whoWillPay === 'you'
          ? friend.balance + (+totalBill - +mySpend)
          : friend.balance - mySpend
      }
      : friend
    ))
  }

  return (
    <main className="app">
      <aside className="sidebar">
        <ul>
          {friends.map(friend => {
            const { message, color } = getMsgInfo(friend.balance)
            const isSelectedFriend = friend.id === selectedFriend?.id

            return (
              <li key={friend.id}>
                <img src={friend.img} alt={`Foto de ${friend.name}`} />
                <h3>{friend.name}</h3>
                <p className={color}>{message}</p>
                <button
                  onClick={() => handleClickFriend(friend)}
                  className={`button ${isSelectedFriend ? 'button-close' : ''}`}
                >
                  {isSelectedFriend ? 'Fechar' : 'Selecionar'}
                </button>
              </li>
            )
          }
          )}
        </ul>
      </aside>

      {selectedFriend && <form onSubmit={handleSubmitShareBill} className="form-split-bill">
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
      </form>}
    </main>
  )
}

export { App }
