const COLORS = {
  MAIN: "#464646",
  DANGER: "#CB444A",
  SUCCESS: "#52A551"
};
const buildPredictionChartOptions = (value, title) => {
  let message_color = COLORS.MAIN;
  let failure_warning_subtext = "";
  if (parseInt(value) == 0) {
    failure_warning_subtext = "Sin riesgo";
    message_color = COLORS.SUCCESS;
  } else {
    failure_warning_subtext = "Riesgo de Caída";
    message_color = COLORS.DANGER;
  }
  const option = {
    title: {
      show: true,
      textStyle: {
        color: message_color,
        fontSize: 50,
      },
      text: `${failure_warning_subtext}`,
      subtext: `${title}`,
      subtextStyle: {
        color: COLORS.MAIN,
        fontSize: 20,
      },
      left: "center",
      top: "center",
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
    },
    series: [],
  };
  return option;
};
const buildNumericChartOptions = (value, title) => {
  const option = {
    title: {
      show: true,
      textStyle: {
        color: COLORS.MAIN,
        fontSize: 50,
      },
      text: `${value}`,
      subtext: `${title}`,
      subtextStyle: {
        color: COLORS.MAIN,
        fontSize: 20,
      },
      left: "center",
      top: "center",
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
    },
    series: [],
  };
  return option;
};
const buildChartOptions = (percent, title) => {
  let formatted_percent = parseFloat(percent);
  formatted_percent = (formatted_percent / 100).toFixed(2);
  const option = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "75%"],
        radius: "90%",
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, "#52A551"],
              [0.5, "#58D9F9"],
              [0.75, "#FDDD60"],
              [1, "#FF6E76"],
            ],
          },
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "12%",
          width: 20,
          offsetCenter: [0, "-60%"],
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: "auto",
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: "auto",
            width: 5,
          },
        },
        axisLabel: {
          color: COLORS.MAIN,
          fontSize: 20,
          distance: -60,
          rotate: "tangential",
          formatter: function (value) {
            if (value === 0.875) {
              return "Grado D";
            } else if (value === 0.625) {
              return "Grado C";
            } else if (value === 0.375) {
              return "Grado B";
            } else if (value === 0.125) {
              return "Grado A";
            }
            return "";
          },
        },
        title: {
          offsetCenter: [0, "-10%"],
          fontSize: 20,
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, "-35%"],
          valueAnimation: true,
          formatter: function (value) {
            // return Math.round(value * 100) + "";
            return Math.round(value * 100) + "%";
          },
          color: "inherit",
        },
        data: [
          {
            value: formatted_percent,
            name: title,
          },
        ],
      },
    ],
  };
  return option;
};
const setupChart = (chartObj, option) => {
  // Set the options and render the chart
  chartObj.setOption(option);
  // Add a resize event listener
  window.addEventListener("resize", () => {
    chartObj.resize(); // Resize the chart when the window resizes
  });
};
/* Vanilla JS Demo */
/* Initialize Firebase */
firebase.initializeApp(firebaseConfig);
/* Globals */
const toastLiveExample = document.getElementById("liveToast");
let toast_message = document.getElementById("toastMessage");
/* Read Firebase values */
let active_proc = firebase.database().ref().child("active_proc");
let cpu_count_logical = firebase.database().ref().child("cpu_count_logical");
let cpu_count_physical = firebase.database().ref().child("cpu_count_physical");
let cpu_ctx_switches = firebase.database().ref().child("cpu_ctx_switches");
let cpu_interrupts = firebase.database().ref().child("cpu_interrupts");
let cpu_soft_interrupts = firebase
  .database()
  .ref()
  .child("cpu_soft_interrupts");
let cpu_syscalls = firebase.database().ref().child("cpu_syscalls");
let disk_free = firebase.database().ref().child("disk_free");
let disk_total = firebase.database().ref().child("disk_total");
let disk_used = firebase.database().ref().child("disk_used");
let mem_available = firebase.database().ref().child("mem_available");
let mem_used = firebase.database().ref().child("mem_used");
let swap_mem_free = firebase.database().ref().child("swap_mem_free");
let swap_mem_used = firebase.database().ref().child("swap_mem_used");
let uptime = firebase.database().ref().child("uptime");
let cpu_percent = firebase.database().ref().child("cpu_percent");
let disk_percent = firebase.database().ref().child("disk_percent");
let mem_percent = firebase.database().ref().child("mem_percent");
let swap_mem_percent = firebase.database().ref().child("swap_mem_percent");
let failure_warning = firebase.database().ref().child("failure_warning");
/* Event Listeners */
active_proc.on("value", (snapshot) => {
  let active_proc_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `Active processes changed: " ${active_proc_value}%`;
  let active_proc_chart_container = document.getElementById(
    "active_proc_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const active_proc_chart = echarts.init(active_proc_chart_container);
  setupChart(
    active_proc_chart,
    buildNumericChartOptions(active_proc_value, "Procesos Activos")
  );
});
uptime.on("value", (snapshot) => {
  let uptime_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `Uptime changed: " ${uptime_value}%`;
  let uptime_chart_container = document.getElementById("uptime_container");
  toastBootstrap.show();
  /* Chart Options */
  const uptime_chart = echarts.init(uptime_chart_container);
  setupChart(
    uptime_chart,
    buildNumericChartOptions(uptime_value, "Tiempo de Actividad (segundos)")
  );
});
cpu_ctx_switches.on("value", (snapshot) => {
  let cpu_ctx_switches_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `CTX Switches changed: ${cpu_ctx_switches_value}%`;
  let cpu_ctx_switches_chart_container = document.getElementById(
    "cpu_ctx_switches_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const uptime_chart = echarts.init(cpu_ctx_switches_chart_container);
  setupChart(
    uptime_chart,
    buildNumericChartOptions(cpu_ctx_switches_value, "CPU CTX Switches")
  );
});
cpu_interrupts.on("value", (snapshot) => {
  let cpu_interrupts_container_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `CPU Interrupts changed: ${cpu_interrupts_container_value}%`;
  let cpu_interrupts_chart_container = document.getElementById(
    "cpu_interrupts_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const cpu_interrupts_chart = echarts.init(cpu_interrupts_chart_container);
  setupChart(
    cpu_interrupts_chart,
    buildNumericChartOptions(
      cpu_interrupts_container_value,
      "Interrupciones (CPU)"
    )
  );
});
cpu_soft_interrupts.on("value", (snapshot) => {
  let cpu_soft_interrupts_container_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `CPU Soft Interrupts changed: ${cpu_soft_interrupts_container_value}%`;
  let cpu_soft_interrupts_chart_container = document.getElementById(
    "cpu_soft_interrupts_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const cpu_soft_interrupts_chart = echarts.init(
    cpu_soft_interrupts_chart_container
  );
  setupChart(
    cpu_soft_interrupts_chart,
    buildNumericChartOptions(
      cpu_soft_interrupts_container_value,
      "Interrupciones de Software (CPU)"
    )
  );
});
cpu_syscalls.on("value", (snapshot) => {
  let cpu_syscalls_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `CPU Syscalls changed: ${cpu_syscalls_value}%`;
  let cpu_syscalls_chart_container = document.getElementById(
    "cpu_syscalls_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const cpu_syscalls_chart = echarts.init(cpu_syscalls_chart_container);
  setupChart(
    cpu_syscalls_chart,
    buildNumericChartOptions(cpu_syscalls_value, "Llamadas al Sistema (CPU)")
  );
});
cpu_count_logical.on("value", (snapshot) => {
  let cpu_count_logical_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `CPU Count Logical changed: ${cpu_count_logical_value}%`;
  let cpu_count_logical_chart_container = document.getElementById(
    "cpu_count_logical_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const cpu_count_logical_chart = echarts.init(
    cpu_count_logical_chart_container
  );
  setupChart(
    cpu_count_logical_chart,
    buildNumericChartOptions(cpu_count_logical_value, "CPUs Lógicos")
  );
});
cpu_count_physical.on("value", (snapshot) => {
  let cpu_count_physical_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `CPU Count Physical changed: ${cpu_count_physical_value}%`;
  let cpu_count_physical_chart_container = document.getElementById(
    "cpu_count_physical_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const cpu_count_physical_chart = echarts.init(
    cpu_count_physical_chart_container
  );
  setupChart(
    cpu_count_physical_chart,
    buildNumericChartOptions(cpu_count_physical_value, "CPUs Físicos")
  );
});
mem_available.on("value", (snapshot) => {
  let mem_available_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `Available Mem changed: ${mem_available_value}%`;
  let mem_available_chart_container = document.getElementById(
    "mem_available_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const mem_available_chart = echarts.init(mem_available_chart_container);
  setupChart(
    mem_available_chart,
    buildNumericChartOptions(mem_available_value, "Memoria Disponible (bytes)")
  );
});
mem_used.on("value", (snapshot) => {
  let mem_used_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `Used Mem changed: ${mem_used_value}%`;
  let mem_used_chart_container = document.getElementById("mem_used_container");
  toastBootstrap.show();
  /* Chart Options */
  const mem_used_chart = echarts.init(mem_used_chart_container);
  setupChart(
    mem_used_chart,
    buildNumericChartOptions(mem_used_value, "Memoria en Uso (bytes)")
  );
});
mem_percent.on("value", (snapshot) => {
  let mem_percent_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `Mem percent changed: ${mem_percent_value}%`;
  let mem_percent_chart_container = document.getElementById(
    "mem_percent_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const mem_percent_chart = echarts.init(mem_percent_chart_container);
  setupChart(
    mem_percent_chart,
    buildNumericChartOptions(mem_percent_value, "Uso de Memoria (%)")
  );
});
disk_total.on("value", (snapshot) => {
  let disk_total_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `Disk total changed: ${disk_total_value}%`;
  let disk_total_chart_container = document.getElementById(
    "disk_total_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const disk_total_chart = echarts.init(disk_total_chart_container);
  setupChart(
    disk_total_chart,
    buildNumericChartOptions(disk_total_value, "Espacio Total en Disco (bytes)")
  );
});
disk_used.on("value", (snapshot) => {
  let disk_used_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `Disk used changed: ${disk_used_value}%`;
  let disk_used_chart_container = document.getElementById(
    "disk_used_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const disk_used_chart = echarts.init(disk_used_chart_container);
  setupChart(
    disk_used_chart,
    buildNumericChartOptions(
      disk_used_value,
      "Espacio Utilizado en Disco (bytes)"
    )
  );
});
disk_free.on("value", (snapshot) => {
  let disk_free_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `Disk free changed: ${disk_free_value}%`;
  let disk_free_chart_container = document.getElementById(
    "disk_free_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const disk_free_chart = echarts.init(disk_free_chart_container);
  setupChart(
    disk_free_chart,
    buildNumericChartOptions(disk_free_value, "Espacio Libre en Disco (bytes)")
  );
});
swap_mem_used.on("value", (snapshot) => {
  let swap_mem_used_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `Swap mem used changed: ${swap_mem_used_value}%`;
  let swap_mem_used_chart_container = document.getElementById(
    "swap_mem_used_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const swap_mem_used_chart = echarts.init(swap_mem_used_chart_container);
  setupChart(
    swap_mem_used_chart,
    buildNumericChartOptions(
      swap_mem_used_value,
      "Memoria Swap Utilizada (bytes)"
    )
  );
});
swap_mem_free.on("value", (snapshot) => {
  let swap_mem_free_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `Swap mem free changed: " ${swap_mem_free_value}%`;
  let swap_mem_free_chart_container = document.getElementById(
    "swap_mem_free_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const swap_mem_free_chart = echarts.init(swap_mem_free_chart_container);
  setupChart(
    swap_mem_free_chart,
    buildNumericChartOptions(swap_mem_free_value, "Memoria Swap Libre (bytes)")
  );
});
swap_mem_percent.on("value", (snapshot) => {
  let swap_mem_percent_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `Swap mem percent changed: ${swap_mem_percent_value}%`;
  let swap_mem_percent_chart_container = document.getElementById(
    "swap_mem_percent_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const swap_mem_percent_chart = echarts.init(swap_mem_percent_chart_container);
  setupChart(
    swap_mem_percent_chart,
    buildChartOptions(swap_mem_percent_value, "Uso de Swap")
  );
});
cpu_percent.on("value", (snapshot) => {
  let cpu_percent_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `CPU Usage changed: ${cpu_percent_value}%`;
  let cpu_percent_chart_container = document.getElementById(
    "cpu_percent_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const cpu_chart = echarts.init(cpu_percent_chart_container);
  setupChart(cpu_chart, buildChartOptions(cpu_percent_value, "Uso de CPU"));
});
disk_percent.on("value", (snapshot) => {
  let disk_percent_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = `Disk Usage changed: " ${disk_percent_value}%`;
  let disk_percent_chart_container = document.getElementById(
    "disk_percent_container"
  );
  toastBootstrap.show();
  /* Chart Options */
  const disk_chart = echarts.init(disk_percent_chart_container);
  setupChart(disk_chart, buildChartOptions(disk_percent_value, "Uso de Disco"));
});
failure_warning.on("value", (snapshot) => {
  let failure_warning_value = snapshot.val();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText =
    "Failure status changed changed: " + failure_warning_value;
  toastBootstrap.show();
  let failure_warning_chart_container = document.getElementById("failure_warning_container");
  /* Chart Options */
  const failure_warning_chart = echarts.init(failure_warning_chart_container);
  setupChart(
    failure_warning_chart,
    buildPredictionChartOptions(failure_warning_value, "Predicción de Fallo de Infraestructura")
  );
});
