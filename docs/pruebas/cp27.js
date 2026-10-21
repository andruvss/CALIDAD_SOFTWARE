import http from 'k6/http';
import { check } from 'k6';
export const options = {
  vus: 50,
  duration: '1m',
  thresholds: { http_req_duration: ['p(95)<300'], http_req_failed: ['rate==0'] },
};
const API = 'http://host.docker.internal:4450';
const H = { headers: { Authorization: `Bearer ${__ENV.TOKEN}`, 'Content-Type': 'application/json' } };
export default function () {
  check(http.get(`${API}/clientes`, H), { 'GET /clientes 200': (r) => r.status === 200 });
  const n = `${__VU}-${__ITER}-${Date.now()}`;
  check(http.post(`${API}/clientes`, JSON.stringify({ nombre: `k6 ${n}`, correo: `k6-${n}@test.cl` }), H), { 'POST /clientes 201': (r) => r.status === 201 });
}
