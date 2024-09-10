import { useEffect, useState } from 'react';
import { listClients } from '../services/ReportService';
import { Link } from 'react-router-dom';
import { Client } from '../types/Client/Client';
import { Address } from '../types/Address/Address';
import { Phone } from '../types/Phone/Phone';
import { Dependent } from '../types/Dependent/Dependent';
import style from '../style/Global.module.css';
import styleTable from '../style/Table.module.css';
import { Product } from '../types/order_product/product/Product';
import { Order, OrderProduct } from '../types/order_product/order/Order';
// import generatePdf from '../components/Pdf/GeneratePdf';

const ReportsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const response = await listClients();
        if (response) {
          setClients(response);
        } else {
          console.error('Failed to load clients');
        }
      } catch (error) {
        console.error('An error occurred while loading clients:', error);
      }
    };

    loadClients();
  }, []);

  return (
    <div className="page">
      <header>
        <h1>Relatório de Clientes</h1>
        <nav className={style.menu}>
          <Link to={`/`}>Clientes</Link> |{' '}
          <Link className={style.active} to={`/reports`}>
            Relatório
          </Link>{' '}
          |{' '}
          <Link to={`/shopping`} state={{ clients: clients }}>
            Compras
          </Link>
        </nav>
      </header>
      {/* <button className={style.pdf} onClick={() => generatePdf(clients)}>
        Gerar PDF
      </button> */}
      <table className={styleTable.tableReport}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Dependente</th>
            <th>Compras</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client: Client, id) => (
            <tr key={id}>
              <td>{client.name || ''}</td>
              <td>{client.cpf || ''}</td>
              <td>{client.email || ''}</td>
              <td>
                {client.phones &&
                  client.phones.map((phone, id) => (
                    <div key={id} className={styleTable.phoneCell}>
                      {(phone as Phone).phoneNumber || ''}
                    </div>
                  ))}
              </td>
              <td>
                {client.addresses &&
                  client.addresses.map((address, id) => (
                    <div key={id} className={styleTable.addressCell}>
                      {(address as Address).cep || ''},{' '}
                      {(address as Address).street || ''} Nº{' '}
                      {(address as Address).number || ''},{' '}
                      {(address as Address).district || ''},{' '}
                      {(address as Address).city || ''} -{' '}
                      {(address as Address).state || ''}
                    </div>
                  ))}
              </td>
              <td>
                {client.dependents &&
                  client.dependents.map((dependent, id) => (
                    <div key={id} className={styleTable.dependentCell}>
                      {(dependent as Dependent).name || ''}
                    </div>
                  ))}
              </td>
              <td>
                {/* {client.orders &&
                  client.orders.map((order: OrderProduct) => (
                    <div key={order.id}>
                      {order.products &&
                        order.products.map((product: Product) => (
                          <div>
                            {product.name || ''} - R$ {product.price || ''}
                          </div>
                        ))}
                    </div>
                  ))} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsPage;
