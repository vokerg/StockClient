import React from 'react';

const ProductRest = ({stockRests}) => {
  return (
    <div>
      <table>
        <tbody>
          {stockRests.map((stockRest, key) => {
            return (
              <tr key={key}>
                <td>{stockRest.stock.name}</td>
                <td>{stockRest.qty}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProductRest;
