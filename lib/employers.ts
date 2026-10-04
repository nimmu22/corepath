// Official company directory. Directory entries are not live feed integrations.
const rows = `AECOM India|aecom.com
Turner & Townsend|turnerandtownsend.com
Assystem India|assystem.com
Larsen & Toubro|larsentoubro.com
Tata Projects|tataprojects.com
Tata Steel|tatasteel.com
Tata Motors|tatamotors.com
Tata Power|tatapower.com
Tata Chemicals|tatachemicals.com
Tata Consulting Engineers|tataconsultingengineers.com
Tata Electronics|tataelectronics.com
Voltas|voltas.com
Titan|titancompany.in
Trent|trentlimited.com
Indian Hotels|ihcltata.com
Reliance Industries|ril.com
Reliance Infrastructure|rinfra.com
Adani Enterprises|adanienterprises.com
Adani Ports|adaniports.com
Adani Power|adanipower.com
Adani Green Energy|adanigreenenergy.com
Adani Energy Solutions|adanienergysolutions.com
Ambuja Cements|ambujacement.com
ACC|acclimited.com
JSW Steel|jswsteel.in
JSW Energy|jsw.in
Jindal Steel|jindalsteel.com
Jindal Stainless|jindalstainless.com
Mahindra & Mahindra|mahindra.com
Tech Mahindra|techmahindra.com
Mahindra Lifespaces|mahindralifespaces.com
Godrej Enterprises|godrejenterprises.com
Godrej Properties|godrejproperties.com
Ashok Leyland|ashokleyland.com
TVS Motor|tvsmotor.com
Bajaj Auto|bajajauto.com
Hero MotoCorp|heromotocorp.com
Eicher Motors|eichermotors.com
Royal Enfield|royalenfield.com
Bharat Forge|bharatforge.com
Sundram Fasteners|sundram.com
Sona Comstar|sonacomstar.com
Samvardhana Motherson|motherson.com
Bosch India|bosch.in
Maruti Suzuki|marutisuzuki.com
Hyundai Motor India|hyundai.com
Honda Cars India|hondacarindia.com
Toyota Kirloskar Motor|toyotabharat.com
Force Motors|forcemotors.com
Escorts Kubota|escortskubota.com
BEML|bemlindia.in
BHEL|bhel.com
BEL|bel-india.in
HAL|hal-india.co.in
NTPC|ntpc.co.in
NHPC|nhpcindia.com
Power Grid|powergrid.in
SJVN|sjvn.nic.in
NLC India|nlcindia.in
ONGC|ongcindia.com
Oil India|oil-india.com
Indian Oil|iocl.com
Bharat Petroleum|bharatpetroleum.in
Hindustan Petroleum|hindustanpetroleum.com
GAIL|gailonline.com
Engineers India|engineersindia.com
SAIL|sail.co.in
NMDC|nmdc.co.in
Coal India|coalindia.in
NALCO|nalcoindia.com
Hindustan Copper|hindustancopper.com
Rashtriya Ispat Nigam|vizagsteel.com
RITES|rites.com
IRCON|ircon.org
Rail Vikas Nigam|rvnl.org
NBCC|nbccindia.in
WAPCOS|wapcos.co.in
Cochin Shipyard|cochinshipyard.in
Mazagon Dock|mazagondock.in
Garden Reach Shipbuilders|grse.in
Goa Shipyard|goashipyard.in
Hindustan Shipyard|hslvizag.in
UltraTech Cement|ultratechcement.com
Shree Cement|shreecement.com
Dalmia Bharat|dalmiabharat.com
Ramco Cements|ramcocements.in
JK Cement|jkcement.com
JK Lakshmi Cement|jklakshmicement.com
India Cements|indiacements.co.in
Birla Corporation|birlacorporation.com
Nuvoco Vistas|nuvoco.com
KEC International|kecrpg.com
Kalpataru Projects|kalpataruprojects.com
NCC|ncclimited.com
Afcons Infrastructure|afcons.com
Hindustan Construction|hccindia.com
PNC Infratech|pncinfratech.com
Dilip Buildcon|dilipbuildcon.com
GR Infraprojects|grinfra.com
HG Infra|hginfra.com
Ashoka Buildcon|ashokabuildcon.com
Welspun Enterprises|welspunenterprises.com
Sterling and Wilson|sterlingandwilson.com
Thermax|thermaxglobal.com
Cummins India|cummins.com
Kirloskar Brothers|kirloskarpumps.com
Kirloskar Oil Engines|kirloskaroilengines.com
KSB India|ksb.com
Crompton|crompton.co.in
Havells|havells.com
Bajaj Electricals|bajajelectricals.com
V-Guard|vguard.in
Polycab|polycab.com
KEI Industries|kei-ind.com
Finolex Cables|finolex.com
Apar Industries|apar.com
CG Power|cgglobal.com
Suzlon|suzlon.com
Inox Wind|inoxwind.com
Waaree Energies|waaree.com
Vikram Solar|vikramsolar.com
Premier Energies|premierenergies.com
ReNew|renew.com
Vedanta|vedantalimited.com
Hindalco|hindalco.com
Hindustan Zinc|hzlindia.com
UPL|upl-ltd.com
Aarti Industries|aarti-industries.com
SRF|srf.com
Deepak Nitrite|godeepak.com
Pidilite|pidilite.com
Asian Paints|asianpaints.com
Berger Paints|bergerpaints.com
ITC|itcportal.com
Britannia|britannia.co.in
Dabur|dabur.com
Lupin|lupin.com
Cipla|cipla.com
Sun Pharma|sunpharma.com
Dr. Reddy's|drreddys.com
Biocon|biocon.com`;
export const employers=rows.split('\n').map(row=>{const [name,domain]=row.split('|');const feed=name==='AECOM India'?'aecom-india':name==='Turner & Townsend'?'turner-india':name==='Assystem India'?'assystem-india':name==='Tata Consulting Engineers'?'tata-consulting':name==='Tata Electronics'?'tata-electronics':name==='Bosch India'?'bosch-india':null;return {name,url:name==='Larsen & Toubro'?'https://www.larsentoubro.com/corporate/careers':name==='NTPC'?'https://ntpc.co.in/jobs-ntpc':'https://www.'+domain,feed,origin:!!feed&&!name.startsWith('Tata')||name==='Bosch India'||name==='Hyundai Motor India'||name==='Honda Cars India'||name==='Toyota Kirloskar Motor'||name==='Cummins India'||name==='KSB India'?'International':'India'}});
