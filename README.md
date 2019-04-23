Computação Gráfica - RayCasting2D
---

### Como utilizar:
1. Versão online no link: [https://julianolmarinho.github.io/EEL882-RayCasting2D](https://julianolmarinho.github.io/EEL882-RayCasting2D).
2. Usando a versão do repositório: 
- Clonar o repositório
- Abrir arquivo index.html em um navegador
- Interagir com a interface definida

## Instruções
### Criação de objetos: 

1. Selecionar o obeto a ser desenhado (Polígono como padrão) 
2. Selecionar o modo de desenho
* Polígono
    * O click do mouse dentro do canvas adiciona um novo ponto na posição do mouse. 
    Se não existe polígono sendo criado, então um novo polígono é adionado.
    Caso um polígono já esteja sendo desenhado, então o novo ponto é adicionado a esse mesmo polígono. 
    * Ao dar dois cliques, o polígono é finalizado.
* Raio
    * O primeiro click adiciona um novo raio com origem no ponto atual do mouse.
    * Após o primeiro click, o ângulo do raio seguirá o ponteiro do mouse.
    * O segundo click finaliza a criação de um novo raio.

### Edição de objetos:
1. Selecionar o modo edição
* Polígono
    * Ao clicar e arrastar em um dos vértices do polígono, esse vértice será alterado. 
    * Ao clicar e arrastar dentro da área do polígono, todo o objetos será movido de acordo com a posição do mouse.
    * Ao deixar de pressionar o botão direito do mouse, a edição é finalizada.
* Raio
    * Ao clicar no ponto central do raio e arrastar o mouse, o raio será movido de acordo com a posição do mouse.  
    * Ao clicar no ponto presente da ponta da seta que indica a direção do raio, a direção será alterada de acordo com a posição do mouse enquanto o botão do mouse é pressiondado.
    * Soltar o botão do mouse finaliza a edição para ambos os casos.
## Interseções
1. Ao selecionar a opção "Mostrar Intersecções" um ponto colorido será adicionado a cada intersecção do raio com os limites do polígono.
    * Pontos verdes indicam que o raio está entrando no polígono.
    * Pontos vermelhos indicam que o raio está saindo do polígono.
