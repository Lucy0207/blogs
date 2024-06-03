export interface BlogPaginationProps {
    current: number;
    total: number;
    onChange: (page: number, pageSize: number) => void
        
    }
