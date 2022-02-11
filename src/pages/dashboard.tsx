import { Header } from "../components/Header";
import {Flex, SimpleGrid,Box,Text,theme, grid} from '@chakra-ui/react' 
import { Sidebar } from "../components/Sidebar";
import dynamic from "next/dynamic";
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(()=> import('react-apexcharts'),{
    ssr: false,
})


const options: ApexOptions = {
    chart: {
        toolbar:{
            show: false,
        },
        zoom:{
            enabled: false,
        },
        foreColor: theme.colors.gray[500],
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip:{
        enabled: false,
    },
    xaxis:{
        type: 'datetime',
        axisBorder:{
            color: theme.colors.gray[600]
        },
        axisTicks:{
            color: theme.colors.gray[600]
        },
        categories:[
            '2021-02-04T00:00:00.000Z',
            '2021-02-05T00:00:00.000Z',
            '2021-02-06T00:00:00.000Z',
            '2021-02-07T00:00:00.000Z',
            '2021-02-08T00:00:00.000Z',
            '2021-02-09T00:00:00.000Z',
            '2021-02-10T00:00:00.000Z',
        ],
    },
    fill:{
        opacity: 0.3,
        type: 'gradient',
        gradient:{
           shade: 'dark',
           opacityFrom: 0.7,
           opacityTo: 0.3,

        }
    }
}

const series = [
    {
        name: 'series1', data:[48,155,44,12,36,33,77]
    }
]


export default function Dashboard (){
    return(
       
        <Flex h='100%' direction='column' >

            <Header/>
            <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
                <Sidebar/>
                <SimpleGrid flex='1' gap='4' minChildWidth='320px' align='flex-start'>
                    <Box
                        p={['6','8']}
                        bg='gray.800'
                        borderRadius={8}
                    >
                     <Text fontSize='lg' mg='4'>Inscritos da semana</Text> 
                       <Chart type='area' options={options} series={series} height={160}/>
                    </Box>
                    <Box
                        p={['6','8']}
                        bg='gray.800'
                        borderRadius={8}
                    >
                     <Text fontSize='lg' mg='4'>Texa de abertura</Text> 
                     <Chart type='bar' options={options} series={series} height={160}/>
                       
                    </Box>
                </SimpleGrid>
            </Flex>
        </Flex>
    )

}