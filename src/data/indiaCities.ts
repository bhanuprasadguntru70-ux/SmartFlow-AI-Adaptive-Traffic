export interface CityLocation {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  zoom: number;
  trafficStatus: 'LIVE' | 'DATA_DELAYED' | 'UNAVAILABLE';
  keyIntersections: {
    id: string;
    name: string;
    lat: number;
    lng: number;
    roadName: string;
  }[];
  hospitals: {
    name: string;
    lat: number;
    lng: number;
    emergencyContact: string;
  }[];
}

export const INDIA_CITIES: CityLocation[] = [
  // Andhra Pradesh
  {
    id: 'vijayawada',
    name: 'Vijayawada',
    state: 'Andhra Pradesh',
    lat: 16.5062,
    lng: 80.6480,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'vja-benz', name: 'Benz Circle', lat: 16.5029, lng: 80.6480, roadName: 'Bandar Road / NH-16' },
      { id: 'vja-ramavarappadu', name: 'Ramavarappadu Ring', lat: 16.5218, lng: 80.6729, roadName: 'Eluru Road / NH-16' },
      { id: 'vja-autonagar', name: 'Auto Nagar Gate', lat: 16.4947, lng: 80.6781, roadName: 'Bandar Road (NH-65)' },
      { id: 'vja-enikepadu', name: 'Enikepadu Junction', lat: 16.5332, lng: 80.7019, roadName: 'NH-16 Airport Highway' },
      { id: 'vja-pcr', name: 'Police Control Room Junction', lat: 16.5135, lng: 80.6234, roadName: 'MG Road' },
    ],
    hospitals: [
      { name: 'Government General Hospital (GGH)', lat: 16.5186, lng: 80.6354, emergencyContact: '108' },
      { name: 'Andhra Hospitals Heart & Brain', lat: 16.5034, lng: 80.6495, emergencyContact: '0866-2494949' },
      { name: 'Manipal Hospital Tadepalli', lat: 16.4882, lng: 80.6092, emergencyContact: '1800-102-5555' },
    ],
  },
  {
    id: 'visakhapatnam',
    name: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    lat: 17.7289,
    lng: 83.3032,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'viz-rtc', name: 'RTC Complex Junction', lat: 17.7289, lng: 83.3032, roadName: 'Asilmetta Flyover Road' },
      { id: 'viz-maddilapalem', name: 'Maddilapalem Junction', lat: 17.7388, lng: 83.3325, roadName: 'Beach Road Link / NH-16' },
      { id: 'viz-siripuram', name: 'Siripuram Circle', lat: 17.7214, lng: 83.3156, roadName: 'Waltair Main Road' },
      { id: 'viz-gajuwaka', name: 'Gajuwaka Junction', lat: 17.6908, lng: 83.2104, roadName: 'Industrial Corridor NH-16' },
    ],
    hospitals: [
      { name: 'King George Hospital (KGH)', lat: 17.7088, lng: 83.3056, emergencyContact: '108' },
      { name: 'Apollo Hospitals Health City Arilova', lat: 17.7654, lng: 83.3382, emergencyContact: '1066' },
    ],
  },
  {
    id: 'guntur',
    name: 'Guntur',
    state: 'Andhra Pradesh',
    lat: 16.3067,
    lng: 80.4365,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'gtr-lodge', name: 'Lodge Center Junction', lat: 16.3067, lng: 80.4365, roadName: 'GT Road' },
      { id: 'gtr-kanna', name: 'Kannavarithota Cross', lat: 16.3120, lng: 80.4420, roadName: 'Collectorate Road' },
    ],
    hospitals: [
      { name: 'Guntur Government General Hospital', lat: 16.3025, lng: 80.4468, emergencyContact: '108' },
    ],
  },
  {
    id: 'tirupati',
    name: 'Tirupati',
    state: 'Andhra Pradesh',
    lat: 13.6288,
    lng: 79.4192,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'tpt-alipiri', name: 'Alipiri Toll Gate Junction', lat: 13.6512, lng: 79.3985, roadName: 'Ghat Road' },
      { id: 'tpt-leela', name: 'Leela Mahal Circle', lat: 13.6350, lng: 79.4210, roadName: 'KT Road' },
    ],
    hospitals: [
      { name: 'SVIMS Super Speciality Hospital', lat: 13.6394, lng: 79.4042, emergencyContact: '0877-2287777' },
      { name: 'RUIA Government General Hospital', lat: 13.6380, lng: 79.4060, emergencyContact: '108' },
    ],
  },

  // Telangana
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    lat: 17.4450,
    lng: 78.3850,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'hyd-cyber', name: 'HITEC City Cyber Towers', lat: 17.4504, lng: 78.3808, roadName: 'HITEC City Main Road' },
      { id: 'hyd-gachibowli', name: 'Gachibowli Flyover Junction', lat: 17.4401, lng: 78.3489, roadName: 'Old Mumbai Highway / ORR' },
      { id: 'hyd-panjagutta', name: 'Panjagutta Central Cross', lat: 17.4265, lng: 78.4516, roadName: 'Raj Bhavan Road' },
      { id: 'hyd-jubilee', name: 'Jubilee Hills Check Post', lat: 17.4300, lng: 78.4080, roadName: 'Road No. 36' },
      { id: 'hyd-begumpet', name: 'Begumpet Airport Flyover', lat: 17.4440, lng: 78.4720, roadName: 'Sardar Patel Road' },
    ],
    hospitals: [
      { name: 'Nizam Institute of Medical Sciences (NIMS)', lat: 17.4225, lng: 78.4530, emergencyContact: '108' },
      { name: 'AIG Hospitals Gachibowli', lat: 17.4435, lng: 78.3615, emergencyContact: '040-42444222' },
      { name: 'Apollo Hospitals Jubilee Hills', lat: 17.4168, lng: 78.4128, emergencyContact: '1066' },
    ],
  },
  {
    id: 'warangal',
    name: 'Warangal',
    state: 'Telangana',
    lat: 17.9784,
    lng: 79.5941,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'wgl-kazipet', name: 'Kazipet Diesel Colony Junction', lat: 17.9780, lng: 79.5120, roadName: 'NH-163' },
      { id: 'wgl-hanamkonda', name: 'Hanamkonda Public Gardens Jn', lat: 18.0080, lng: 79.5750, roadName: 'Hunter Road' },
    ],
    hospitals: [
      { name: 'MGM Hospital Warangal', lat: 17.9940, lng: 79.5880, emergencyContact: '108' },
    ],
  },

  // Karnataka
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    lat: 12.9716,
    lng: 77.5946,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'blr-silk', name: 'Silk Board Junction', lat: 12.9172, lng: 77.6229, roadName: 'Hosur Road / Outer Ring Road' },
      { id: 'blr-marathahalli', name: 'Marathahalli Bridge', lat: 12.9591, lng: 77.6974, roadName: 'HAL Airport Road' },
      { id: 'blr-hebbal', name: 'Hebbal Flyover Junction', lat: 13.0358, lng: 77.5970, roadName: 'Bellary Road (NH-44)' },
      { id: 'blr-whitefield', name: 'Hope Farm Junction', lat: 12.9830, lng: 77.7510, roadName: 'Whitefield Main Road' },
      { id: 'blr-tin', name: 'Tin Factory Junction', lat: 12.9980, lng: 77.6620, roadName: 'Old Madras Road' },
    ],
    hospitals: [
      { name: 'Manipal Hospital Old Airport Road', lat: 12.9585, lng: 77.6480, emergencyContact: '080-2502-4444' },
      { name: 'NIMHANS Hospital', lat: 12.9390, lng: 77.5960, emergencyContact: '108' },
      { name: 'St. John Medical College Hospital', lat: 12.9310, lng: 77.6200, emergencyContact: '080-2206-5000' },
    ],
  },
  {
    id: 'mysuru',
    name: 'Mysuru',
    state: 'Karnataka',
    lat: 12.2958,
    lng: 76.6394,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'mys-suburban', name: 'Suburban Bus Stand Junction', lat: 12.3080, lng: 76.6570, roadName: 'B.N. Road' },
      { id: 'mys-kr', name: 'K.R. Circle', lat: 12.3070, lng: 76.6490, roadName: 'Sayyaji Rao Road' },
    ],
    hospitals: [
      { name: 'K.R. Hospital Mysore', lat: 12.3120, lng: 76.6480, emergencyContact: '108' },
    ],
  },

  // Tamil Nadu
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    lat: 13.0827,
    lng: 80.2707,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'chn-kathipara', name: 'Kathipara Junction', lat: 13.0067, lng: 80.2023, roadName: 'GST Road / Mount-Poonamallee' },
      { id: 'chn-anna', name: 'Anna Arch Junction', lat: 13.0845, lng: 80.2180, roadName: 'Poonamallee High Road' },
      { id: 'chn-madhya', name: 'Madhya Kailash', lat: 13.0060, lng: 80.2520, roadName: 'Sardar Patel Road / OMR' },
      { id: 'chn-gemini', name: 'Gemini Flyover (Anna Flyover)', lat: 13.0530, lng: 80.2510, roadName: 'Anna Salai' },
    ],
    hospitals: [
      { name: 'Rajiv Gandhi Government General Hospital', lat: 13.0815, lng: 80.2770, emergencyContact: '108' },
      { name: 'Apollo Hospital Greams Road', lat: 13.0590, lng: 80.2520, emergencyContact: '1066' },
      { name: 'MIOT International Manapakkam', lat: 13.0230, lng: 80.1760, emergencyContact: '044-4200-2288' },
    ],
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    state: 'Tamil Nadu',
    lat: 11.0168,
    lng: 76.9558,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'cbe-gandhi', name: 'Gandhipuram Signal', lat: 11.0175, lng: 76.9675, roadName: 'Cross Cut Road' },
      { id: 'cbe-lakshmi', name: 'Lakshmi Mills Junction', lat: 11.0110, lng: 76.9850, roadName: 'Avinashi Road' },
    ],
    hospitals: [
      { name: 'Coimbatore Medical College Hospital (CMCH)', lat: 11.0020, lng: 76.9680, emergencyContact: '108' },
      { name: 'KMCH Avinashi Road', lat: 11.0450, lng: 77.0350, emergencyContact: '0422-4323800' },
    ],
  },

  // Maharashtra
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    lat: 19.0760,
    lng: 72.8777,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'mum-bkc', name: 'BKC Connector Junction', lat: 19.0657, lng: 72.8687, roadName: 'BKC Road / Eastern Express' },
      { id: 'mum-dadar', name: 'Dadar TT Circle', lat: 19.0190, lng: 72.8430, roadName: 'Dr. Babasaheb Ambedkar Road' },
      { id: 'mum-weh', name: 'Western Express Highway Andheri', lat: 19.1190, lng: 72.8560, roadName: 'WEH / Andheri-Kurla Link' },
      { id: 'mum-sion', name: 'Sion Circle Junction', lat: 19.0430, lng: 72.8630, roadName: 'Sion Flyover' },
    ],
    hospitals: [
      { name: 'KEM Hospital Parel', lat: 19.0035, lng: 72.8420, emergencyContact: '108' },
      { name: 'Lilavati Hospital Bandra', lat: 19.0515, lng: 72.8290, emergencyContact: '022-2675-1000' },
      { name: 'Hinduja Hospital Mahim', lat: 19.0340, lng: 72.8390, emergencyContact: '022-2445-1515' },
    ],
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    lat: 18.5204,
    lng: 73.8567,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'pun-uni', name: 'University Circle Junction', lat: 18.5529, lng: 73.8267, roadName: 'Ganeshkhind Road' },
      { id: 'pun-swargate', name: 'Swargate Junction', lat: 18.5015, lng: 73.8580, roadName: 'Satara Road / Shivaji Road' },
      { id: 'pun-chandani', name: 'Chandani Chowk', lat: 18.5070, lng: 73.7840, roadName: 'Mumbai-Bangalore Bypass' },
      { id: 'pun-hinjewadi', name: 'Hinjewadi Shivaji Chowk', lat: 18.5910, lng: 73.7380, roadName: 'Hinjewadi Phase 1' },
    ],
    hospitals: [
      { name: 'Sassoon General Hospital Pune', lat: 18.5265, lng: 73.8740, emergencyContact: '108' },
      { name: 'Ruby Hall Clinic Pune Station', lat: 18.5320, lng: 73.8780, emergencyContact: '020-6645-5100' },
    ],
  },
  {
    id: 'nagpur',
    name: 'Nagpur',
    state: 'Maharashtra',
    lat: 21.1458,
    lng: 79.0882,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'ngp-variaty', name: 'Variety Square Sitabuldi', lat: 21.1440, lng: 79.0820, roadName: 'Wardha Road' },
      { id: 'ngp-zero', name: 'Zero Mile Freedom Park', lat: 21.1480, lng: 79.0810, roadName: 'Central Avenue' },
    ],
    hospitals: [
      { name: 'Government Medical College Nagpur (GMC)', lat: 21.1270, lng: 79.0960, emergencyContact: '108' },
      { name: 'AIIMS Nagpur MIHAN', lat: 21.0540, lng: 79.0320, emergencyContact: '0712-282-5000' },
    ],
  },

  // Delhi NCR
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'Delhi NCR',
    lat: 28.6139,
    lng: 77.2090,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'del-ito', name: 'ITO Crossing', lat: 28.6289, lng: 77.2407, roadName: 'Vikas Marg / Bahadur Shah Zafar Marg' },
      { id: 'del-aiims', name: 'AIIMS Ring Road Junction', lat: 28.5670, lng: 77.2100, roadName: 'Mahatma Gandhi Ring Road' },
      { id: 'del-dhaula', name: 'Dhaula Kuan Interchange', lat: 28.5920, lng: 77.1610, roadName: 'NH-48 / Ring Road' },
      { id: 'del-ashram', name: 'Ashram Chowk Flyover', lat: 28.5710, lng: 77.2580, roadName: 'Mathura Road' },
    ],
    hospitals: [
      { name: 'AIIMS New Delhi Ansari Nagar', lat: 28.5672, lng: 77.2102, emergencyContact: '108' },
      { name: 'Safdarjung Hospital', lat: 28.5690, lng: 77.2070, emergencyContact: '011-2616-5060' },
      { name: 'Sir Ganga Ram Hospital', lat: 28.6385, lng: 77.1890, emergencyContact: '011-2575-0000' },
    ],
  },
  {
    id: 'gurugram',
    name: 'Gurugram',
    state: 'Delhi NCR',
    lat: 28.4595,
    lng: 77.0266,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'gur-iffco', name: 'IFFCO Chowk Junction', lat: 28.4720, lng: 77.0720, roadName: 'NH-48 Delhi-Jaipur Expressway' },
      { id: 'gur-rajiv', name: 'Rajiv Chowk Underpass', lat: 28.4480, lng: 77.0420, roadName: 'Sohna Road / NH-48' },
      { id: 'gur-cyber', name: 'Cyber Hub Shankar Chowk', lat: 28.4980, lng: 77.0890, roadName: 'DLF Cyber City' },
    ],
    hospitals: [
      { name: 'Medanta The Medicity Gurugram', lat: 28.4385, lng: 77.0435, emergencyContact: '1068' },
      { name: 'Fortis Memorial Research Institute', lat: 28.4580, lng: 77.0730, emergencyContact: '0124-4962200' },
    ],
  },
  {
    id: 'noida',
    name: 'Noida',
    state: 'Delhi NCR',
    lat: 28.5355,
    lng: 77.3910,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'noi-pari', name: 'Pari Chowk Junction', lat: 28.4650, lng: 77.5120, roadName: 'Yamuna Expressway Link' },
      { id: 'noi-dnd', name: 'DND Flyway Toll Plaza', lat: 28.5680, lng: 77.3050, roadName: 'DND Flyway' },
      { id: 'noi-botanical', name: 'Botanical Garden Metro Jn', lat: 28.5640, lng: 77.3340, roadName: 'Captain Shashi Kant Marg' },
    ],
    hospitals: [
      { name: 'Jaypee Hospital Sector 128', lat: 28.5140, lng: 77.3710, emergencyContact: '0120-4122222' },
      { name: 'Fortis Hospital Sector 62', lat: 28.6180, lng: 77.3720, emergencyContact: '0120-4300222' },
    ],
  },

  // West Bengal
  {
    id: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    lat: 22.5726,
    lng: 88.3639,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'kol-park', name: 'Park Street Flyover Junction', lat: 22.5510, lng: 88.3520, roadName: 'Jawaharlal Nehru Road' },
      { id: 'kol-howrah', name: 'Howrah Bridge Approach', lat: 22.5850, lng: 88.3460, roadName: 'Strand Road' },
      { id: 'kol-em', name: 'EM Bypass Ruby Crossing', lat: 22.5130, lng: 88.4010, roadName: 'Eastern Metropolitan Bypass' },
    ],
    hospitals: [
      { name: 'SSKM Government Hospital Kolkata', lat: 22.5390, lng: 88.3440, emergencyContact: '108' },
      { name: 'Apollo Multispeciality Hospitals EM Bypass', lat: 22.5710, lng: 88.4020, emergencyContact: '033-2320-3040' },
    ],
  },

  // Kerala
  {
    id: 'kochi',
    name: 'Kochi',
    state: 'Kerala',
    lat: 9.9312,
    lng: 76.2673,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'koc-edappally', name: 'Edappally Toll Junction', lat: 10.0260, lng: 76.3080, roadName: 'NH-66 / NH-544 Bypass' },
      { id: 'koc-vyttila', name: 'Vyttila Mobility Hub Junction', lat: 9.9670, lng: 76.3190, roadName: 'Kochi Bypass' },
      { id: 'koc-kaloor', name: 'Kaloor Stadium Signal', lat: 10.0010, lng: 76.3000, roadName: 'Banerji Road' },
    ],
    hospitals: [
      { name: 'Ernakulam General Hospital', lat: 9.9720, lng: 76.2810, emergencyContact: '108' },
      { name: 'Aster Medcity Cheranalloor', lat: 10.0520, lng: 76.2730, emergencyContact: '0484-6699999' },
    ],
  },
  {
    id: 'thiruvananthapuram',
    name: 'Thiruvananthapuram',
    state: 'Kerala',
    lat: 8.5241,
    lng: 76.9366,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'tvm-east', name: 'East Fort Signal', lat: 8.4840, lng: 76.9480, roadName: 'MG Road' },
      { id: 'tvm-pattom', name: 'Pattom Junction', lat: 8.5280, lng: 76.9440, roadName: 'Kesavadasapuram Road' },
    ],
    hospitals: [
      { name: 'Government Medical College Thiruvananthapuram', lat: 8.5220, lng: 76.9280, emergencyContact: '108' },
    ],
  },

  // Gujarat
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    state: 'Gujarat',
    lat: 23.0225,
    lng: 72.5714,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'ahd-iskcon', name: 'ISKCON Cross Road Flyover', lat: 23.0280, lng: 72.5070, roadName: 'SG Highway (NH-147)' },
      { id: 'ahd-shivranjani', name: 'Shivranjani Cross Roads', lat: 23.0230, lng: 72.5310, roadName: '132 Feet Ring Road' },
      { id: 'ahd-nehrunagar', name: 'Nehru Nagar Circle', lat: 23.0180, lng: 72.5440, roadName: 'SM Road' },
    ],
    hospitals: [
      { name: 'Civil Hospital Asarwa Ahmedabad', lat: 23.0510, lng: 72.6020, emergencyContact: '108' },
      { name: 'Zydus Hospitals SG Highway', lat: 23.0640, lng: 72.5180, emergencyContact: '079-6619-0201' },
    ],
  },
  {
    id: 'surat',
    name: 'Surat',
    state: 'Gujarat',
    lat: 21.1702,
    lng: 72.8311,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'sur-majura', name: 'Majura Gate Junction', lat: 21.1780, lng: 72.8210, roadName: 'Ring Road' },
      { id: 'sur-athwa', name: 'Athwa Gate Circle', lat: 21.1820, lng: 72.8120, roadName: 'Dumas Road' },
    ],
    hospitals: [
      { name: 'New Civil Hospital Surat', lat: 21.1730, lng: 72.8190, emergencyContact: '108' },
    ],
  },

  // Rajasthan
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    lat: 26.9124,
    lng: 75.7873,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'jai-ajmer', name: 'Ajmeri Gate Cross', lat: 26.9160, lng: 75.8200, roadName: 'MI Road' },
      { id: 'jai-statue', name: 'Statue Circle', lat: 26.9080, lng: 75.8050, roadName: 'Bhagwan Das Road' },
      { id: 'jai-transport', name: 'Transport Nagar Chauraha', lat: 26.9030, lng: 75.8480, roadName: 'NH-21 Agra Road' },
    ],
    hospitals: [
      { name: 'SMS Hospital Jaipur', lat: 26.9020, lng: 75.8150, emergencyContact: '108' },
      { name: 'Fortis Escorts Hospital Malviya Nagar', lat: 26.8430, lng: 75.8040, emergencyContact: '0141-254-7000' },
    ],
  },

  // Uttar Pradesh
  {
    id: 'lucknow',
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    lat: 26.8467,
    lng: 80.9462,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'lko-hazratganj', name: 'Hazratganj Main Chauraha', lat: 26.8520, lng: 80.9440, roadName: 'MG Road' },
      { id: 'lko-charbagh', name: 'Charbagh Station Circle', lat: 26.8320, lng: 80.9220, roadName: 'Station Road' },
      { id: 'lko-polytechnic', name: 'Polytechnic Chauraha', lat: 26.8770, lng: 80.9980, roadName: 'Faizabad Road / Ring Road' },
    ],
    hospitals: [
      { name: 'King George Medical University (KGMU)', lat: 26.8680, lng: 80.9160, emergencyContact: '108' },
      { name: 'Sanjay Gandhi PGI (SGPGIMS)', lat: 26.7580, lng: 80.9380, emergencyContact: '0522-2668004' },
      { name: 'Medanta Hospital Lucknow', lat: 26.7980, lng: 81.0020, emergencyContact: '0522-4505050' },
    ],
  },
  {
    id: 'kanpur',
    name: 'Kanpur',
    state: 'Uttar Pradesh',
    lat: 26.4499,
    lng: 80.3319,
    zoom: 13,
    trafficStatus: 'LIVE',
    keyIntersections: [
      { id: 'knp-ghanta', name: 'Ghanta Ghar Chowk', lat: 26.4630, lng: 80.3520, roadName: 'Station Road' },
      { id: 'knp-rawatpur', name: 'Rawatpur Crossing', lat: 26.4780, lng: 80.3010, roadName: 'GT Road' },
    ],
    hospitals: [
      { name: 'Lala Lajpat Rai Hospital (Hallet Hospital)', lat: 26.4850, lng: 80.3040, emergencyContact: '108' },
    ],
  },
];
