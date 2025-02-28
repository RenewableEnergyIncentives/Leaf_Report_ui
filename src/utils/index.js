import { categoryMapping } from '@/data'

export function formatDate(isoString) {
  const date = new Date(isoString)
  const options = { month: 'long', day: 'numeric', year: 'numeric' }
  return date.toLocaleDateString('en-US', options).replace(/(\d+),/, '$1th,')
}

export function getTrueKeys(obj, key) {
  const trueKeys = Object.keys(obj)
    .filter((key) => obj[key])
    .map((item) => item.replace(key, ''))
  const transformedKeys = trueKeys.map((item) => categoryMapping[item] || item)
  if (transformedKeys.includes('Windows/Doors')) {
    const index = transformedKeys.indexOf('Windows/Doors')
    transformedKeys.splice(index, 1)
    transformedKeys.push('Windows')
    transformedKeys.push('Doors')
  }
  return transformedKeys
}

export function roundToTwo(num) {
  if (typeof num !== 'number' || isNaN(num)) return '0.00' // Return as string to match format
  if (num === 0) return '0.00'

  const rounded = (Math.round(num * 100) / 100).toFixed(2) // Ensure two decimal places
  return formatNumber(rounded)
}

export function formatNumber(num, isSingle = false) {
  const number = typeof num === 'string' ? parseFloat(num) : num
  if (isNaN(number)) return num
  let options = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  if (isSingle) options = { minimumFractionDigits: 0, maximumFractionDigits: 0 }
  return number.toLocaleString(undefined, options)
}

export function transfermDataForStore(data) {
  let transformed = {}
  transformed['report_info'] = {
    filename: data['filename'],
    report_id: data['_id'],
    report_date: data['timestamp'],
  }
  transformed['3_12'] = data['3_12']
  transformed['19_29'] = data['19_29']
  transformed['31_41'] = data['31_41']
  transformed['43_53'] = data['43_53']
  transformed['55_59'] = data['55_59']
  transformed['61_65'] = data['61_65']
  transformed['67_71'] = data['67_71']
  transformed['73_78'] = data['73_78']
  transformed['primary_cooling_ac'] = {
    info: data['83_87'],
    system_upgraded_key_points: data['89_98'],
    rebates: {
      rebate_1: data['101_104'],
      rebate_2: data['106_109'],
      rebate_3: data['111_114'],
    },
    summer: { ...data['117_122'], ...data['124_126'], ...data['130_136'], ...data['138_140'] },
    winter: { ...data['143_148'], ...data['150_154'], ...data['156_162'], ...data['164_166'] },
    annual: { ...data['169_174'], ...data['176_180'], ...data['182_188'], ...data['190_192'] },
  }
  transformed['secondary_cooling_ac'] = {
    info: data['195_199'],
    system_upgraded_key_points: data['201_210'],
    rebates: {
      rebate_1: data['213_216'],
      rebate_2: data['218_221'],
      rebate_3: data['223_226'],
    },
    summer: { ...data['229_234'], ...data['236_240'], ...data['242_248'], ...data['250_252'] },
    winter: { ...data['255_260'], ...data['262_266'], ...data['268_274'], ...data['276_278'] },
    annual: { ...data['281_286'], ...data['288_292'], ...data['294_300'], ...data['302_304'] },
  }
  transformed['primary_heating_Source'] = {
    info: data['307_311'],
    system_upgraded_key_points: data['313_322'],
    rebates: {
      rebate_1: data['325_328'],
      rebate_2: data['330_333'],
      rebate_3: data['335_338'],
    },
    summer: { ...data['341_346'], ...data['348_352'], ...data['354_360'], ...data['362_364'] },
    winter: { ...data['367_372'], ...data['374_378'], ...data['380_386'], ...data['388_390'] },
    annual: { ...data['393_398'], ...data['400_404'], ...data['406_412'], ...data['414_416'] },
  }
  transformed['secondary_heating_Source'] = {
    info: data['419_423'],
    system_upgraded_key_points: data['425_434'],
    rebates: {
      rebate_1: data['437_440'],
      rebate_2: data['442_445'],
      rebate_3: data['447_450'],
    },
    summer: { ...data['453_458'], ...data['460_464'], ...data['466_472'], ...data['474_476'] },
    winter: { ...data['479_484'], ...data['486_490'], ...data['492_498'], ...data['500_502'] },
    annual: { ...data['505_510'], ...data['512_516'], ...data['518_524'], ...data['526_528'] },
  }
  transformed['windows'] = {
    info: data['531_535'],
    system_upgraded_key_points: data['537_546'],
    rebates: {
      rebate_1: data['549_552'],
      rebate_2: data['554_557'],
      rebate_3: data['559_562'],
    },
    summer: { ...data['565_570'], ...data['572_576'], ...data['578_584'], ...data['586_588'] },
    winter: { ...data['591_596'], ...data['598_602'], ...data['604_610'], ...data['612_614'] },
    annual: { ...data['617_622'], ...data['624_628'], ...data['630_636'], ...data['638_640'] },
  }
  transformed['range_stove'] = {
    info: data['643_647'],
    system_upgraded_key_points: data['649_658'],
    rebates: {
      rebate_1: data['661_664'],
      rebate_2: data['666_669'],
      rebate_3: data['671_674'],
    },
    summer: { ...data['677_682'], ...data['684_688'], ...data['690_696'], ...data['698_700'] },
    winter: { ...data['703_708'], ...data['710_714'], ...data['716_722'], ...data['724_726'] },
    annual: { ...data['729_734'], ...data['736_740'], ...data['742_748'], ...data['750_752'] },
  }
  transformed['cloths_dryer'] = {
    info: data['755_759'],
    system_upgraded_key_points: data['761_770'],
    rebates: {
      rebate_1: data['773_776'],
      rebate_2: data['778_781'],
      rebate_3: data['783_786'],
    },
    summer: { ...data['789_794'], ...data['796_800'], ...data['802_808'], ...data['810_812'] },
    winter: { ...data['815_820'], ...data['822_826'], ...data['828_832'], ...data['836_838'] },
    annual: { ...data['841_846'], ...data['848_852'], ...data['854_860'], ...data['862_864'] },
  }
  transformed['water_heater'] = {
    info: data['867_871'],
    system_upgraded_key_points: data['873_882'],
    rebates: {
      rebate_1: data['885_888'],
      rebate_2: data['890_893'],
      rebate_3: data['895_898'],
    },
    summer: { ...data['901_906'], ...data['908_912'], ...data['914_920'], ...data['922_924'] },
    winter: { ...data['927_932'], ...data['934_938'], ...data['940_946'], ...data['948_950'] },
    annual: { ...data['953_958'], ...data['960_964'], ...data['966_972'], ...data['974_976'] },
  }
  transformed['ceiling_insulation'] = {
    info: data['979_983'],
    system_upgraded_key_points: data['985_994'],
    rebates: {
      rebate_1: data['997_1000'],
      rebate_2: data['1002_1005'],
      rebate_3: data['1007_1010'],
    },
    summer: {
      ...data['1013_1018'],
      ...data['1020_1024'],
      ...data['1026_1032'],
      ...data['1034_1036'],
    },
    winter: {
      ...data['1039_1044'],
      ...data['1046_1050'],
      ...data['1052_1058'],
      ...data['1060_1062'],
    },
    annual: {
      ...data['1065_1070'],
      ...data['1072_1076'],
      ...data['1078_1084'],
      ...data['1086_1088'],
    },
  }
  transformed['wall_insulation'] = {
    info: data['1091_1095'],
    system_upgraded_key_points: data['1097_1106'],
    rebates: {
      rebate_1: data['1109_1112'],
      rebate_2: data['1114_1117'],
      rebate_3: data['1119_1122'],
    },
    summer: {
      ...data['1125_1130'],
      ...data['1132_1136'],
      ...data['1138_1144'],
      ...data['1146_1148'],
    },
    winter: {
      ...data['1151_1156'],
      ...data['1158_1162'],
      ...data['1164_1170'],
      ...data['1172_1174'],
    },
    annual: {
      ...data['1177_1182'],
      ...data['1184_1188'],
      ...data['1190_1196'],
      ...data['1198_1200'],
    },
  }
  ;(transformed['floor_insulation'] = {
    info: data['1203_1207'],
    system_upgraded_key_points: data['1209_1218'],
    rebates: {
      rebate_1: data['1221_1224'],
      rebate_2: data['1226_1229'],
      rebate_3: data['1231_1234'],
    },
    summer: {
      ...data['1237_1242'],
      ...data['1244_1248'],
      ...data['1250_1256'],
      ...data['1258_1260'],
    },
    winter: {
      ...data['1263_1268'],
      ...data['1270_1274'],
      ...data['1276_1282'],
      ...data['1284_1286'],
    },
    annual: {
      ...data['1289_1294'],
      ...data['1296_1300'],
      ...data['1302_1308'],
      ...data['1310_1312'],
    },
  }),
    (transformed['doors'] = {
      info: data['1315_1319'],
      system_upgraded_key_points: data['1321_1330'],
      rebates: {
        rebate_1: data['1333_1336'],
        rebate_2: data['1338_1341'],
        rebate_3: data['1343_1346'],
      },
      summer: {
        ...data['1349_1354'],
        ...data['1356_1360'],
        ...data['1362_1368'],
        ...data['1370_1372'],
      },
      winter: {
        ...data['1375_1380'],
        ...data['1382_1386'],
        ...data['1388_1394'],
        ...data['1396_1398'],
      },
      annual: {
        ...data['1401_1406'],
        ...data['1408_1412'],
        ...data['1414_1420'],
        ...data['1422_1424'],
      },
    })
  return transformed
}
