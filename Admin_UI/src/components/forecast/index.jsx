import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid2';
import SelectArea from '../dropdown/selectArea';
import StyleBackground from '../../themes/stylePage/backgroundPage';
import { useState, useEffect } from 'react';
import { useEnvironmentDataStatistics } from '../../service/useEnvironmentData';
import dayjs from 'dayjs';
import DatePickeronly from '../date/pickerDate';
import { DownloadButtons } from '../button/download';
import SelectWeather from '../dropdown/selectWeather';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeatherForecast = () => {
  const [startDate, setStartDate] = useState(dayjs().format('YYYY/MM/DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY/MM/DD'));
  const [selectType, setSelectType] = useState('temperature');
  const [selectedArea, setSelectedArea] = useState('KV001');
  const [chartData, setChartData] = useState([]);
  const { data, error, loading } = useEnvironmentDataStatistics(selectedArea, startDate, endDate, selectType, true);
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setChartData(data);
    }
  }, [data]);

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleAreaChange = (area) => {
    setSelectedArea(area);
  };

  return (
    <StyleBackground>
      <Stack direction="row" spacing={2}>
        <Typography>Khu vực: </Typography>
        <SelectArea onAreaChange={handleAreaChange} />
        <Typography>Chọn ngày: </Typography>
        <DatePickeronly onDateChange={handleDateChange} />
      </Stack>
      <Stack direction="row" spacing={39.3}>
        <Typography variant="subtitle1">Nhiệt độ</Typography>
        <Typography variant="subtitle1">Độ ẩm</Typography>
        <Typography variant="subtitle1">Không khí</Typography>
      </Stack>
    </StyleBackground>
  );
};

export default WeatherForecast;
