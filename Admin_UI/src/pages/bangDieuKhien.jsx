import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import AnalyticEcommerce from '../components/cards/AnalyticEcommerce';
import UniqueVisitorCard from '../components/cards/uniqueVisitorCard';
import useTotalEnvironmentData from '../service/useTotalEnvironmentData';
import WeatherForecast from '../components/forecast';
// ==============================|| DASHBOARD - DEFAULT ||============================== //

const formatDate = (date) => date.toISOString().split('T')[0];

export default function dashboardDefault() {
  const today = formatDate(new Date());
  const yesterday = formatDate(new Date(Date.now() - 86400000));
  const { yesterdayData: yesterdayData, todayData: todayData, loading, error } = useTotalEnvironmentData(yesterday, today);
  if (loading) return null;
  if (error) return null;
  if (!yesterdayData || !todayData) return <Typography>Không có dữ liệu!</Typography>;

  const calculatePercentage = (today, yesterday) => {
    if (!yesterday || isNaN(yesterday) || !isFinite(yesterday)) return Math.round(today);
    if (yesterday === 0) return Math.round(today);
    return (((today - yesterday) / yesterday) * 100).toFixed(0);
  };
  const dataText = [
    {
      title: 'Độ ẩm (%)',
      count: Math.round(todayData.humidity),
      previousValue: Math.round(yesterdayData.humidity),
      percentage: calculatePercentage(todayData.humidity, yesterdayData.humidity),
      extra: 'Độ ẩm trung bình'
    },
    {
      title: 'Nhiệt độ (°C)',
      count: Math.round(todayData.temperature),
      previousValue: Math.round(yesterdayData.temperature),
      percentage: calculatePercentage(todayData.temperature, yesterdayData.temperature),
      extra: 'Nhiệt độ trung bình'
    },
    {
      title: 'Ánh sáng (lux)',
      count: Math.round(todayData.brightness),
      previousValue: Math.round(yesterdayData.brightness),
      percentage: calculatePercentage(todayData.brightness, yesterdayData.brightness),
      extra: 'Ánh sáng trung bình'
    },
    {
      title: 'Chất lượng không khí (AQI)',
      count: Math.round(todayData.airQuality),
      previousValue: Math.round(yesterdayData.airQuality),
      percentage: calculatePercentage(todayData.airQuality, yesterdayData.airQuality),
      extra: 'Chỉ số AQI trung bình'
    }
  ];
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="subtitle1">BẢNG ĐIỀU KHIỂN</Typography>
      </Grid>
      {dataText.map((item) => {
        const isLoss = item.count < item.previousValue;
        const color = isLoss ? 'warning' : 'primary';

        return (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <AnalyticEcommerce
              key={item.card}
              title={item.title}
              count={item.count.toString()}
              percentage={item.percentage}
              color={color}
              extra={item.extra}
              isLoss={isLoss}
            />
          </Grid>
        );
      })}

      <Grid>
        <Typography variant="subtitle1">Dự báo thời tiết</Typography>
        <WeatherForecast />
      </Grid>
      <Grid size={{ xs: 12, md: 7, lg: 12 }}>
        <UniqueVisitorCard />
      </Grid>
    </Grid>
  );
}
