import {Button} from 'antd';
import {DingdingOutlined} from '@ant-design/icons';

const Logo = ({size=32, color='inherit'})=>{
    return (
        <Button
            className='w-fit font-bold flex items-center shadow-none border-0'
            icon={<DingdingOutlined className='text-rose-600' />}
            style={{
                fontFamily: 'bela-semibold',
                fontSize: size,
                color
            }}
        >
            LMS
        </Button>
    )
}

export default Logo