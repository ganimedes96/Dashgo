import {Box, Stack, Text} from '@chakra-ui/react'
import { PaginationItem } from './PaginationItem'


interface PaginationProps{
    totalCountOfRegisters: number;
    registersPerpage?: number;
    currentPage?: number;
    onPageChange: (page: number)=>void
}

const siblingsCount = 1

const generatePagesArray =(from: number, to: number) =>{
    return[...new Array(to - from)]
    .map((_, index) =>{
        return from + index + 1
    })
    .filter(page => page > 0)
}



export const Pagination = ({
    
    totalCountOfRegisters,
    registersPerpage = 10,
    currentPage = 1,
    onPageChange,
    
}:PaginationProps) => {
   const lastPage = Math.floor(totalCountOfRegisters/ registersPerpage)
   
    const previousPages = currentPage > 1 
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

    const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage) )
    : []

    return(

        <Stack 
            direction={['column',"row"]}
            mt='8'
            justify='space-between'
            align='center'

        > 
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>
             <Stack direction="row" spacing='2'>

                  {currentPage > (1 + siblingsCount)&&(
                      <>
                        <PaginationItem onPageChange={onPageChange} number={1}/>
                        {currentPage > (2 + siblingsCount)&&(
                            <Text color='pink.400' width="8" textAlign="center">...</Text>
                        )}
                      </>
                  )}
                
                   {previousPages.length > 0 && previousPages.map(page =>{
                       return <PaginationItem onPageChange={onPageChange} key={page} number={page}/>
                   })}

                    <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent/>
                    
                    {nextPages.length > 0 && nextPages.map(page =>{
                       return <PaginationItem onPageChange={onPageChange} key={page} number={page}/>
                   })}

                   {(currentPage + siblingsCount) < lastPage && (
                       <>
                        {(currentPage + 1 + siblingsCount) < lastPage && (
                        <Text color='pink.400' width="8" textAlign="center" >...</Text>)}
                        <PaginationItem onPageChange={onPageChange} number={lastPage}/>

                       </>
                       
                   )}
                
            </Stack>  
        </Stack>




    )
}