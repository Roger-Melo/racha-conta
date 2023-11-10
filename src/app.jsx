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

const App = () => (
  <main className="app">
    <aside className="sidebar">
      <ul>
        {initialFriends.map(friend => {
          const { message, color } = getMsgInfo(friend.balance)

          return (
            <li key={friend.id}>
              <img src={friend.img} alt={`Foto de ${friend.name}`} />
              <h3>{friend.name}</h3>
              <p className={color}>{message}</p>
              <button className="button">Selecionar</button>
            </li>
          )
        }
        )}
      </ul>
    </aside>
  </main>
)

export { App }
