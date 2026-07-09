import { Component, inject, OnInit } from "@angular/core";
import { Deposit } from "../services/deposit";
import {
  Chart,
  registerables,
} from "chart.js";


Chart.register(...registerables);
@Component({
  selector: "app-monthly-deposits",
  standalone: true,
  imports: [],
  templateUrl: "./monthly-deposits.html",
  styleUrl: "./monthly-deposits.css",
})
export class MonthlyDeposits implements OnInit {
  chart: any;
  apiData: any[] = [];

  private depositService = inject(Deposit);

  ngOnInit(): void {
    this.depositService.getDeposits().subscribe((data) => {
      this.apiData = data;
      this.renderChart();
    });
  }
  renderChart() {
    const monthlyData = this.apiData.reduce((acc:{[key:string]:number},curr)=>{
      const date = new Date(curr.created_at);
      const monthName = date.toLocaleString('en-US',{month:'long', year:'numeric'})
      acc[monthName] = (acc[monthName] || 0) + curr.amount;
      return acc;
    },{})
    const labels = Object.keys(monthlyData);
    const dataPoints = Object.values(monthlyData);
    const axisLabels = this.apiData.map((item) => [
      new Date(item.created_at).toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
      item.amount,
    ]);
    const amounts = this.apiData.map((item) => item.amount);

    // 2. Destroy existing chart before recreating
    if (this.chart) {
      this.chart.destroy();
    }

    // 3. Render new chart
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Amount Saved",
            data: dataPoints,
            backgroundColor: "#FF5722",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            barThickness: 85,
            borderRadius:8
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio:false,
        scales: {
          x: {
            title: {
              display: true,
              text: "Month",
            }
          },
          y: {
            beginAtZero: true,
            ticks: { display: true },
            title: {
              display: true,
            },
            grid:{
              drawTicks:false
            }
          },
        },
      },
    });
  }
}
