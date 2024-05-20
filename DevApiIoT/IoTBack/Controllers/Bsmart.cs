using AutoMapper;
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
        private readonly IMapper _mapper;

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

        [HttpDelete("interruptor")]
        public async   Task<IActionResult> Remover(int id)
        {
            var dado = await _context.Interruptor.FindAsync(id);
            if (dado != null)
            {
                Interruptor d = dado;
                _context.Interruptor.Remove(d);
               
            }
            return Ok(await _context.SaveChangesAsync() > 0?"Removido":"Não removido");
        }


        [HttpPost("interruptor")]
        public async Task<IActionResult> PostInterruptor([FromBody] FInterruptor view)
        {
            
            Interruptor dados = new()
            {
                Id = view.Id,
                localizacao = view.Localizacao,
                tipo = "ENERGIA",
                ligado=0
            };

            var dado =await _context.Interruptor.FindAsync(view.Id);
            if (dado != null)
            {
                dado.localizacao = view.Localizacao;
              
            }
            else
            {
                await _context.Interruptor.AddAsync(dados);
            }

            await _context.SaveChangesAsync();
            return Ok("Registado Ok");
            
        }

        [HttpGet("interruptor/{id}")]
        public   int GetInterruptor(int id)
        {
            return   _context.Interruptor.Find(id)?.ligado??0;
        }

        [HttpGet("find/{id}")]
        public async Task<IActionResult> EditInterruptor(int id)
        {
            var dado = await _context.Interruptor.FindAsync(id);
            if(dado!=null) {

                var result = new
                {
                    id = dado.Id,
                    localizacao = dado.localizacao,
                    tipo = dado.tipo
                };
                return Ok(result);
            }
            return NotFound();
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


        [HttpGet("notificacao")]
        public async Task<IEnumerable<Notificacao>> GetNotificacao()
        {
            return await _context.Notificacao.ToListAsync();
        }

        [HttpPut("notificacao")]
        public async Task<bool> AlterarNotificacao(Notificacao entidade)
        {
            _context.Notificacao.Entry(entidade).State = EntityState.Modified;
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
