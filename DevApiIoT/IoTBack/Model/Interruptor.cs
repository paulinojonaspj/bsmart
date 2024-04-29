using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IOTBack.Model
{
    [Table("interruptor")]
    public class Interruptor
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string localizacao { get; set; }
        public string tipo { get; set; }
        public int ligado_manual { get; set; }
        public int ligado_apoximidade { get; set; }
        public int ligado_presenca { get; set; }
        public int ligado_temperatura_maior { get; set; }
        public int ligado_temperatura_menor { get; set; }
        public int ligado_temperatura_igual { get; set; }
        public int ligado_humidade_maior { get; set; }
        public int ligado_humidade_menor { get; set; }
        public int ligado_humidade_igual { get; set; }
        public int ligado { get; set; }
        public DateTime created_at { get; set; } = DateTime.Now;

        public Interruptor(string localizacao, string tipo, int ligado_manual, int ligado_apoximidade, int ligado_presenca, int ligado_temperatura_maior, int ligado_temperatura_menor, int ligado_temperatura_igual, int ligado_humidade_maior, int ligado_humidade_menor, int ligado_humidade_igual, int ligado, DateTime created_at)
        {
            
            this.localizacao = localizacao ?? throw new ArgumentNullException(nameof(localizacao));
            this.tipo = tipo ?? throw new ArgumentNullException(nameof(tipo));
            this.ligado_manual = ligado_manual;
            this.ligado_apoximidade = ligado_apoximidade;
            this.ligado_presenca = ligado_presenca;
            this.ligado_temperatura_maior = ligado_temperatura_maior;
            this.ligado_temperatura_menor = ligado_temperatura_menor;
            this.ligado_temperatura_igual = ligado_temperatura_igual;
            this.ligado_humidade_maior = ligado_humidade_maior;
            this.ligado_humidade_menor = ligado_humidade_menor;
            this.ligado_humidade_igual = ligado_humidade_igual;
            this.ligado = ligado;
            this.created_at = created_at;
        }
    }
}
