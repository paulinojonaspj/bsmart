using IOTBack.Infraestrutura;
using IOTBack.Model;
using IOTBack.Model.Consumo;
using IOTBack.Model.Objetivo;
using IOTBack.Model.Utilizador;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IOTBack.Controllers
{
    [ApiController]
    [Route("api/v1/bsmart")]
    public class Bsmart : Controller
    {
        private readonly ConnectionContext _context = new ConnectionContext();

        [HttpGet("consumo")]
        public async Task<IEnumerable<Consumo>> GetConsumo(string data)
        {
            var sql = "SELECT Id, Data,Hora, Unidade,SUM(Quantidade) AS Quantidade, Localizacao, Tipo,Escala FROM consumo WHERE Data LIKE '%" + data+"%' GROUP BY Localizacao, Tipo,Escala;";
          
         return await _context.Consumo.FromSqlRaw(sql).ToListAsync();

           // return await _context.Consumo.Where(c => c.Data.ToString().Contains(data)).ToListAsync();
        }

        [HttpGet("interruptor")]
        public async Task<IEnumerable<Interruptor>> GetInterruptores()
        {
            return await _context.Interruptor.ToListAsync();
        }

        [HttpGet("interruptor/{id}")]
        public   int GetInterruptor(int id)
        {
            return   _context.Interruptor.Find(id)?.ligado??0;
        }

        [HttpGet("objetivos")]
        public async Task<IEnumerable<Objetivo>> GetObjetivos()
        {
            return await _context.Objetivo.ToListAsync();
        }

       [HttpPut("objetivos")]
       public async Task<bool> Alterar(Objetivo entidade)
        {
            _context.Objetivo.Entry(entidade).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0;
        }


        [HttpGet("ligar")]
        public async Task<bool> AlterarInterruptor(int id, int ligado)
        {
            var entidade =   _context.Interruptor.Find(id);
            if (entidade != null) {
                entidade.ligado = entidade.ligado==0?1:0;
                  _context.Interruptor.Entry((Interruptor) entidade).State = EntityState.Modified;
                   return await _context.SaveChangesAsync() > 0;
            }

            return false;
        }

        [HttpGet("utilizador")]
        public async Task<Utilizador> GetUtilizadores()
        {
            await Task.CompletedTask;
            var dado = _context.Utilizador.First();
            return dado;
        }

        [HttpPut("utilizador")]
        public async Task<bool> AlterarUtilizador(Utilizador entidade)
        {
            _context.Utilizador.Entry(entidade).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0;
        }




    }
}
