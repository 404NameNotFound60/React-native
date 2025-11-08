import { DownloadOutlined } from '@ant-design/icons';
import Layout from '@components/shared/layout';
import {
    Card,
    Button,
    Table,
    Dropdown
} from 'antd';

const Sales = ()=>{
    const sales = [
        {
            key: '1',
            customer: 'er saurav',
            email: 'example@gmail.com',
            course: 'react course',
            amount: 1516,
            date: new Date().toLocaleDateString(),
            invoice: <Button icon={<DownloadOutlined />} shape="circle" className='flex items-center justify-center' />
        },
        {
            key: '2',
            customer: 'er saurav',
            email: 'example@gmail.com',
            course: 'react course',
            amount: 1516,
            date: new Date().toLocaleDateString(),
            invoice: <Button icon={<DownloadOutlined />} shape="circle" className='flex items-center justify-center' />
        },
        {
            key: '3',
            customer: 'er saurav',
            email: 'example@gmail.com',
            course: 'react course',
            amount: 1516,
            date: new Date().toLocaleDateString(),
            invoice: <Button icon={<DownloadOutlined />} shape="circle" className='flex items-center justify-center' />
        },
        {
            key: '4',
            customer: 'er saurav',
            email: 'example@gmail.com',
            course: 'react course',
            amount: 1516,
            date: new Date().toLocaleDateString(),
            invoice: <Button icon={<DownloadOutlined />} shape="circle" className='flex items-center justify-center' />
        }
    ]
    const columns = [
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Product',
            dataIndex: 'course',
            key: 'course'
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Invoice',
            dataIndex: 'invoice',
            key: 'invoice'
        }
    ]

    const Toolbar = ()=>{
        return (
            <>
                <Dropdown>
                    <Button>Filter</Button>
                </Dropdown>
            </>
        )
    }

    return (
        <Layout
            title='Sales & Revenue'
            subtitle="Get all the invoice details of customers"
            toolbar={<Toolbar />}
        >
            <div className='flex flex-col gap-y-8'>
                <div className='grid grid-cols-3 gap-6'>
                    <Card title={<h1 className='text-lg'>Sales & Revenue</h1>} className='shadow-lg'>
                        <h1 className='text-4xl font-bold'>₹18,5000</h1>
                    </Card>

                    <Card title={<h1 className='text-lg'>Comission Expenses</h1>} className='shadow-lg'>
                        <h1 className='text-4xl font-bold'>₹16,5000</h1>
                    </Card>

                    <Card title={<h1 className='text-lg'>Net Income</h1>} className='shadow-lg'>
                        <h1 className='text-4xl font-bold'>₹12,5000</h1>
                    </Card>
                </div>
                <Table 
                    dataSource={sales}
                    columns={columns}
                />
            </div>
        </Layout>
    )
}

export default Sales