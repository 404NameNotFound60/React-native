import dynamic from 'next/dynamic';
import Layout from '@components/shared/layout';
import {
    UserOutlined,
    VideoCameraOutlined,
    FileDoneOutlined,
    AlertOutlined
} from '@ant-design/icons';
import {Button, Avatar,Card, Divider, List} from 'antd';
const ApexChart = dynamic(()=>import('react-apexcharts'),{
    ssr: false
})

const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

const Admin = ()=>{

    const revenue = {
        series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
          }, {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
          }],
          options: {
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              type: 'datetime',
              categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          }
    }

    return (
        <Layout
            title="Dashboard"
            subtitle="Observe your overall analytics report"
        >
            <div>
                <div className='grid md:grid-cols-4 gap-6'>
                    <Card className='shadow-md animate__animated animate__fadeIn'>
                        <div className='flex justify-around items-center'>
                            <div className='flex flex-col gap-y-2 items-center'>
                                <Button 
                                    type="primary"
                                    shape="circle"
                                    size="large"
                                    icon={<UserOutlined />}
                                    className='bg-rose-600 flex items-center justify-center'
                                />
                                <h1 className='text-xl font-semibold text-rose-600'>Students</h1>
                            </div>
                            <Divider type="vertical" className='h-24' />
                            <div>
                                <h1 className='text-5xl font-bold text-rose-400'>36K</h1>
                                <p className='mt-1 text-zinc-400 text-lg'>35,969</p>
                            </div>
                        </div>
                    </Card>

                    <Card className='shadow-md animate__animated animate__fadeIn'>
                        <div className='flex justify-around items-center'>
                            <div className='flex flex-col gap-y-2 items-center'>
                                <Button 
                                    type="primary"
                                    shape="circle"
                                    size="large"
                                    icon={<VideoCameraOutlined />}
                                    className='bg-green-600 flex items-center justify-center'
                                />
                                <h1 className='text-xl font-semibold text-green-600'>Courses</h1>
                            </div>
                            <Divider type="vertical" className='h-24' />
                            <div>
                                <h1 className='text-5xl font-bold text-green-400'>12K</h1>
                                <p className='mt-1 text-zinc-400 text-lg'>11,985</p>
                            </div>
                        </div>
                    </Card>

                    <Card className='shadow-md animate__animated animate__fadeIn'>
                        <div className='flex justify-around items-center'>
                            <div className='flex flex-col gap-y-2 items-center'>
                                <Button 
                                    type="primary"
                                    shape="circle"
                                    size="large"
                                    icon={<FileDoneOutlined />}
                                    className='bg-orange-600 flex items-center justify-center'
                                />
                                <h1 className='text-xl font-semibold text-orange-600'>Files</h1>
                            </div>
                            <Divider type="vertical" className='h-24' />
                            <div>
                                <h1 className='text-5xl font-bold text-orange-400'>14K</h1>
                                <p className='mt-1 text-zinc-400 text-lg'>13,339</p>
                            </div>
                        </div>
                    </Card>

                    <Card className='shadow-md animate__animated animate__fadeIn'>
                        <div className='flex justify-around items-center'>
                            <div className='flex flex-col gap-y-2 items-center'>
                                <Button 
                                    type="primary"
                                    shape="circle"
                                    size="large"
                                    icon={<AlertOutlined />}
                                    className='bg-blue-600 flex items-center justify-center'
                                />
                                <h1 className='text-xl font-semibold text-blue-600'>Sales</h1>
                            </div>
                            <Divider type="vertical" className='h-24' />
                            <div>
                                <h1 className='text-5xl font-bold text-blue-400'>9K</h1>
                                <p className='mt-1 text-zinc-400 text-lg'>8,999</p>
                            </div>
                        </div>
                    </Card>

                    <Card className='shadow-md md:col-span-2 animate__animated animate__fadeIn'>
                        <ApexChart 
                            options={revenue.options}
                            series={revenue.series}
                            type="area"
                            height={300}
                        />
                    </Card>

                    <Card className='shadow-md animate__animated animate__fadeIn' title="Recent Students">
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                title={<a href="https://ant.design" className="font-semibold">{item.title}</a>}
                                description="12-05-1900"
                                />
                            </List.Item>
                            )}
                        />
                    </Card>

                    <Card className='shadow-md animate__animated animate__fadeIn' title="Queue Files">
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                title={<a href="https://ant.design" className="font-semibold">{item.title}</a>}
                                description="12-05-1900"
                                />
                            </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </div>
        </Layout>
    )
}

export default Admin