import { Stack, Typography } from "@mui/material";

const PlotToolbar = ({title, children}: {title:string, children:React.ReactNode}) => {
  return (
    <Stack spacing={{ xs: 0, md: 2 }} sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ alignSelf: 'center', textAlign: 'center' }}>
            {title}
        </Typography>
        {children}
    </Stack>
  )
};

export default PlotToolbar