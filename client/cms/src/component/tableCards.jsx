function TableCards({ data, deleteId }) {
  return (
    <>
      <tr class="bg-white border-b">
        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {data && data.id}
        </td>
        <td class="px-6 py-4">{data && data.name}</td>
        <td class="px-6 py-4">{data && data.type}</td>
        <td class="px-6 py-4">{data && data.rarity}</td>
        <td class="px-6 py-4">{data && data.elixir}</td>
        <td class="px-6 py-4">{data && data.cardPrice}</td>
        <td class="px-6 py-4">{data && data.description}</td>
        <td class="px-6 py-4">
          <img className="w-10" src={data && data.imgUrl} alt={data && data.name} />
        </td>
        <td class="px-6 py-4">
          {data && data.actions}
          <button
            onClick={() => {
              deleteId(data.id);
            }}
            className="bg-red-500 px-4 py-2 text-white"
          >
            delete
          </button>
        </td>
      </tr>
    </>
  );
}

export default TableCards;
