<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const years = ['2019', '2020', '2021', '2022', '2023', '2024']
const populationData = [141008, 141212, 141260, 141175, 140967, 140828]

function initChart() {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)

  const option: echarts.EChartsOption = {
    title: {
      text: '2019-2024 年人口变化趋势',
      subtext: '单位：万人',
      left: 'center',
      textStyle: { fontSize: 16, color: '#333' },
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const { name, value } = params[0]
        return `${name} 年<br/>人口：<b>${value}</b> 万人`
      },
    },
    grid: {
      left: '8%',
      right: '6%',
      top: 80,
      bottom: 40,
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLine: { lineStyle: { color: '#666' } },
      axisLabel: { fontSize: 13, color: '#666' },
    },
    yAxis: {
      type: 'value',
      min: 140500,
      name: '万人',
      axisLabel: { fontSize: 12, color: '#666' },
      splitLine: { lineStyle: { type: 'dashed', color: '#e0e0e0' } },
    },
    series: [
      {
        name: '人口',
        type: 'line',
        data: populationData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { color: '#4a90d9', width: 2.5 },
        itemStyle: { color: '#4a90d9' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(74, 144, 217, 0.3)' },
            { offset: 1, color: 'rgba(74, 144, 217, 0.02)' },
          ]),
        },
        label: {
          show: true,
          position: 'top',
          fontSize: 11,
          color: '#333',
          fontWeight: 500,
        },
        emphasis: {
          focus: 'series',
        },
      },
    ],
  }

  chartInstance.setOption(option)

  window.addEventListener('resize', handleResize)
}

function handleResize() {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<template>
  <div ref="chartRef" class="chart-box"></div>
</template>

<style scoped>
.chart-box {
  width: 100%;
  max-width: 800px;
  height: 420px;
  margin: 0 auto;
}
</style>
