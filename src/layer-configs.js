const LAYER_CONFIGS = [
  {
    file: "01_teren_lotniska.geojson",
    color: [75, 178, 59],
  },
  {
    file: "02_nawierzchnia_utwardzona.geojson",
    color: [168, 168, 168],
  },
  {
    file: "03_stanowiska_postojowe.geojson",
    color: [151, 151, 151]
  },
  {
    file: "04_pas_startowy.geojson",
    color: [48, 48, 48],
  },
  {
    file: "05_poziome_oznaczenia_pasa.geojson",
    color: [255, 255, 255],
  },
  
  {
    file: "06_linie_przerywane_pasa.geojson",
    color: [255, 255, 255]
  },
  {
    file: "07_drogi_poza_obszarem_kolowania.geojson",
    color: [92, 92, 92]
  },
  {
    file: "08_drogi_w_obszarze_kolowania.geojson",
    color: [92, 92, 92]
  },
  {
    file: "09a_oznakowanie_poziome_drogowe_przerywane_drobne.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255]
  },
  {
    file: "09_oznakowanie_poziome_drogowe_przerywane.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255]
  },
  {
    file: "10_oznakowanie_poziome_drogowe_podwojne_linie.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255]
  },
  {
    file: "11_oznakowanie_poziome_drogowe_gruba_linia.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255]
  },
  {
    file: "12_oznakowanie_poziome_drogowe_ciagle.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255]
  },
  {
    file: "13_linie_bezpieczenstwa.geojson",
    color: [100, 255, 100],
    lineColor: [100, 255, 100]
  },
  {
    file: "14_oznakowanie_poziome_ciemne.geojson",
    color: [95, 95, 95],
    lineColor: [95, 95, 95]
  },
  {
    file: "15_oznakowanie_poziome_czarne_bez_ramki.geojson",
    color: [10, 10, 10],
    lineColor: [10, 10, 10]
  },
  {
    file: "16_oznakowanie_poziome_zolte.geojson",
    color: [255, 228, 0],
    hover: true
  },
  {
    file: "17_tory_dla_pieszych.geojson",
    color: [144, 193, 242]

  },
  {
    file: "18_budynki.geojson",
    color: [188, 190, 155],
    extruded: true,
    elevation: 20,
    hover: true
  },
  {
    file: "19_miejsca_oczekiwania_linie_przerywane.geojson",
    lineColor: [255, 228, 0]
  },
  {
    file: "20_miejsca_oczekiwania_linie_ciagle.geojson",
    lineColor: [255, 228, 0]
  },
  {
    file: "21_krawedz_drogi_kolowania.geojson",
    lineColor: [255, 228, 0]
  },
  {
    file: "22_os_drogi_kolowania.geojson",
    lineColor: [255, 228, 0]
  },
  {
    file: "23_os_drogi_kolowania_stanowiska_uzupelniajacego.geojson",
    lineColor: [255, 228, 0]
  },
  {
    file: "24_pola_techniczne.geojson",
    opacity: 0.1,
    color: [255, 255, 255]
  },
  {
    file: "25_strefy_zakazu_parkowania.geojson",
    opacity: 0.1,
    color: [100, 10, 10]
  },
  {
    file: "26_strefy_stanowisk_postojowych.geojson",
    opacity: 0.1,
    color: [204, 0, 3]
  },
  {
    file: "27_miejsca_parkingowe.geojson",
    color: [255, 255, 255]
  }
];

export default LAYER_CONFIGS;