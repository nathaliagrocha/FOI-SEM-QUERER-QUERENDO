// Perguntas dos três quizzes.
// Cada quiz é uma lista de questões e "alternativaCorreta" guarda a resposta certa.
// A correção é feita internamente pelo js/quiz.js, sem mostrar o gabarito na tela.

var quizzes = {

    1: [

        {
            pergunta: "No episódio do curto circuito, que horas iria começar o jogo da seleção contra a Alemanha?",
            alternativaA: "6H da manhã",
            alternativaB: "10h da manhã",
            alternativaC: "2H da tarde",
            alternativaD: "7H da noite",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Qual presente, o seu barriga dá para o seu madruga no dia de São Valentim?",
            alternativaA: "Gravata",
            alternativaB: "Camisa",
            alternativaC: "Chapéu",
            alternativaD: "1 mês de aluguel",
            alternativaCorreta: "alternativaA"
        },

        {
            pergunta: "Qual desses personagens não viaja para Acapulco?",
            alternativaA: "Prof. Girafales",
            alternativaB: "Dona Clotilde",
            alternativaC: "Chiquinha",
            alternativaD: "Nhonho",
            alternativaCorreta: "alternativaD"
        },

        {
            pergunta: "Em qual cidade foi fabricado o tecido de casimira que seu madruga ganha?",
            alternativaA: "Sorocaba",
            alternativaB: "Taubatè",
            alternativaC: "Ribeirão preto",
            alternativaD: "Guaruja",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Qual desses ingredientes faz parte da fórmula da chiquinha para ficar invisível?",
            alternativaA: "Mostarda",
            alternativaB: "Catchup",
            alternativaC: "Maionese",
            alternativaD: "Chocolate",
            alternativaCorreta: "alternativaA"
        },

        {
            pergunta: "Segundo a Dona Neves, quantos inquilinos moram no cortiço?",
            alternativaA: "50",
            alternativaB: "78",
            alternativaC: "99",
            alternativaD: "125",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Qual o nome do filme que o seu madruga convida a  glória para assistir?",
            alternativaA: "Furacão",
            alternativaB: "Tsunami",
            alternativaC: "Avalanche",
            alternativaD: "Terremoto",
            alternativaCorreta: "alternativaD"
        },

        {
            pergunta: "O que é o corpo do benito?",
            alternativaA: "Uma bola quadrada",
            alternativaB: "Uma bola de basquete",
            alternativaC: "Uma bola de beisebol",
            alternativaD: "Uma bola de boliche",
            alternativaCorreta: "alternativaD"
        },

        {
            pergunta: "Quais desses trabalhos seu Madruga nunca exerceu?",
            alternativaA: "Boxeador",
            alternativaB: "Cabelereiro",
            alternativaC: "Açougueiro",
            alternativaD: "Vendedor de balões",
            alternativaCorreta: "alternativaC"
        },

        {
            pergunta: "No episódio ‘Os campeões de ioiô’ qual dessas manobras não é feita pelos jogadores profissionais?",
            alternativaA: "Turbilhão",
            alternativaB: "Lunático",
            alternativaC: "O ladrão",
            alternativaD: "Pêndulo",
            alternativaCorreta: "alternativaD"
        },

        {
            pergunta: "No poema ‘O cão arrependido’. Quantas vezes o verso é repetido?",
            alternativaA: "22",
            alternativaB: "33",
            alternativaC: "44",
            alternativaD: "55",
            alternativaCorreta: "alternativaC"
        },

        {
            pergunta: "Segundo chaves, como se chama os animais que comem de tudo?",
            alternativaA: "Vegetariano",
            alternativaB: "Nhonho",
            alternativaC: "Esfomeados",
            alternativaD: "Ricos",
            alternativaCorreta: "alternativaD"
        },

        {
            pergunta: "Qual a cor do carro que o seu barriga e o Chaves chegam ao hotel em Acapulco?",
            alternativaA: "Verde",
            alternativaB: "Azul",
            alternativaC: "Preto",
            alternativaD: "Branco",
            alternativaCorreta: "alternativaA"
        },

        {
            pergunta: "O que o Chaves pede ao garçom depois de derrubar a mesa no café da manhã?",
            alternativaA: "Torta de nata",
            alternativaB: "Refresco de tamarindo",
            alternativaC: "Sanduíche de presunto",
            alternativaD: "Cachorro quente",
            alternativaCorreta: "alternativaD"
        },

        {
            pergunta: "No episódio ‘Uma aula de canto’, quando as crianças estão tocando no pátio da escola. Qual música a Pópis diz que está tocando?",
            alternativaA: "Mamãe eu quero",
            alternativaB: "Garota de ipanema",
            alternativaC: "Ceuzinho lindo",
            alternativaD: "Que bonita vizinhança",
            alternativaCorreta: "alternativaC"
        },

        {
            pergunta: "Segundo seu Madruga. Qual animal os elefantes seriam se não tivessem trombas?",
            alternativaA: "Jacarés",
            alternativaB: "Vacas",
            alternativaC: "Rinocerontes",
            alternativaD: "Capivarasze",
            alternativaCorreta: "alternativaD"
        },

        {
            pergunta: "No episódio ‘A casa da bruxa’. Qual objeto o seu Madruga pede pra chiquinha levar até a casa da Dona Clotilde",
            alternativaA: "Vassoura",
            alternativaB: "Colônia Francesa",
            alternativaC: "Jornal",
            alternativaD: "Varinha do satanás",
            alternativaCorreta: "alternativaC"
        },

        {
            pergunta: "Por qual motivo os moradores saem da vila e vão morar na casa do Seu Barriga?",
            alternativaA: "A vila vai ser vendida",
            alternativaB: "A vila vai ser dedetizada",
            alternativaC: "A vila vai ser reformada",
            alternativaD: "A vila vai ser demolida",
            alternativaCorreta: "alternativaC"
        },

        {
            pergunta: "Qual era o nome do restaurante da dona Florinda antes dela comprar?",
            alternativaA: "Rica pancita",
            alternativaB: "Fonda",
            alternativaC: "Tienda",
            alternativaD: "Butiquim",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Qual o número do bilhete premiado para Acapulco?",
            alternativaA: "350",
            alternativaB: "487",
            alternativaC: "912",
            alternativaD: "157",
            alternativaCorreta: "alternativaB"
        }

    ],

    2: [

        {
            pergunta: "No episódio “Remédio Duro de Engolir”, o que Seu Madruga faz para tentar convencer Chiquinha a tomar o remédio?",
            alternativaA: "Mistura o remédio com suco.",
            alternativaB: "Finge tomar uma colherada para dar o exemplo.",
            alternativaC: "Ameaça chamar o médico.",
            alternativaD: "Pede para Dona Clotilde conversar com ela.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Quem contou a história do “Jeca Valente” durante o Festival da Boa Vizinhança?",
            alternativaA: "Dona Clotilde.",
            alternativaB: "Chiquinha.",
            alternativaC: "Seu Madruga.",
            alternativaD: "Dona Florinda.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Em “A Bandinha da Vila”, quem coloca miolos de pão nos ouvidos para tentar não escutar o barulho das crianças?",
            alternativaA: "Professor Girafales.",
            alternativaB: "Seu Madruga.",
            alternativaC: "Sr. Barriga.",
            alternativaD: "Jaiminho.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "No episódio “A venda da vila”, por que o Sr. Barriga decide negociar a venda do imóvel com o Sr. Calvillo?",
            alternativaA: "Porque estava cansado dos moradores e queria se mudar.",
            alternativaB: "Porque estava enfrentando um problema cardíaco.",
            alternativaC: "Porque havia perdido dinheiro em uma negociação.",
            alternativaD: "Porque pretendia construir um hotel no terreno.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Durante a mudança de Seu Madruga, o que Chaves e Quico encontram entre os pertences dele?",
            alternativaA: "Uma caixa com cartas antigas.",
            alternativaB: "Um álbum de fotografias de quando ele era boxeador.",
            alternativaC: "Um troféu de futebol.",
            alternativaD: "Uma coleção de ferramentas.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "No episódio “O restaurante da Dona Florinda”, o que a leva a decidir abrir seu próprio estabelecimento?",
            alternativaA: "Ela perde uma aposta com o Professor Girafales.",
            alternativaB: "Ela vai a um bar para comer panquecas e decide comprar o local.",
            alternativaC: "Seu Madruga sugere que ela comece um negócio.",
            alternativaD: "Sr. Barriga oferece o imóvel para ela.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "No episódio “A venda da vila”, qual era o nome do possível comprador do imóvel?",
            alternativaA: "Sr. Cente.",
            alternativaB: "Sr. Calvillo.",
            alternativaC: "Sr. Hurtado.",
            alternativaD: "Sr. Furtado.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "No episódio “O Julgamento do Chaves”, quem propõe realizar um julgamento para decidir se Chaves é culpado pela morte do gato de Quico?",
            alternativaA: "Seu Madruga.",
            alternativaB: "Professor Girafales.",
            alternativaC: "Dona Florinda.",
            alternativaD: "Sr. Barriga.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Em “A Morte do Seu Madruga”, por que ele fica tão assustado durante o dia do próprio aniversário?",
            alternativaA: "Porque acredita que os moradores estão planejando expulsá-lo.",
            alternativaB: "Porque pensa que está prestes a morrer.",
            alternativaC: "Porque acredita que Chiquinha está doente.",
            alternativaD: "Porque recebe uma notícia sobre sua antiga profissão.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "O que faz o Sr. Barriga mudar de ideia sobre o despejo de Seu Madruga?",
            alternativaA: "Chiquinha promete pagar os aluguéis.",
            alternativaB: "Dona Florinda pede que ele tenha piedade.",
            alternativaC: "Ele se lembra de que Seu Madruga salvou sua vida no passado.",
            alternativaD: "Chaves oferece trabalhar para quitar a dívida.",
            alternativaCorreta: "alternativaC"
        },

        {
            pergunta: "Em “O Dinheiro Perdido”, qual é o problema enfrentado por Seu Madruga?",
            alternativaA: "Ele encontra dinheiro, mas não sabe a quem pertence.",
            alternativaB: "Ele consegue o dinheiro do aluguel, mas não consegue encontrá-lo.",
            alternativaC: "Ele empresta dinheiro a Quico e não recebe de volta.",
            alternativaD: "Ele perde o dinheiro que receberia por um trabalho.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "No episódio “Bilhetes Trocados”, qual confusão Chiquinha provoca?",
            alternativaA: "Troca uma carta de amor do Professor Girafales pela lista de compras de Seu Madruga.",
            alternativaB: "Entrega uma carta de Dona Florinda para Seu Madruga.",
            alternativaC: "Troca os bilhetes de aniversário de Quico e Chiquinha.",
            alternativaD: "Entrega uma carta de cobrança do Sr. Barriga ao Professor Girafales.",
            alternativaCorreta: "alternativaA"
        },

        {
            pergunta: "Qual o nome do amigo imaginário de chaves?",
            alternativaA: "Espiquidiberto.",
            alternativaB: "Xelofonfilo.",
            alternativaC: "Cente.",
            alternativaD: "Furtado.",
            alternativaCorreta: "alternativaC"
        },

        {
            pergunta: "No episódio “Os Espíritos Zombeteiros”, quem colocava pratos de comida dentro do barril de Chaves durante a noite, sem se lembrar do que fazia?",
            alternativaA: "Quico.",
            alternativaB: "Seu Madruga.",
            alternativaC: "Dona Clotilde.",
            alternativaD: "Chiquinha.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Em “A Fonte dos Desejos”, quem inventa que a fonte da escola realiza desejos quando alguém joga moedas nela?",
            alternativaA: "Paty.",
            alternativaB: "Pópis.",
            alternativaC: "Chiquinha.",
            alternativaD: "Quico.",
            alternativaCorreta: "alternativaC"
        },

        {
            pergunta: "No episódio “Peixe Cru Faz Bem pra Memória”, de quem eram os peixinhos coloridos que começam a desaparecer?",
            alternativaA: "Dona Florinda.",
            alternativaB: "Chiquinha.",
            alternativaC: "Chaves.",
            alternativaD: "Dona Clotilde.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Em “Pai por Algumas Horas”, quem acaba ficando responsável por cuidar de um bebê depois de uma confusão envolvendo duas cestas?",
            alternativaA: "Professor Girafales.",
            alternativaB: "Sr. Barriga.",
            alternativaC: "Seu Madruga.",
            alternativaD: "Jaiminho.",
            alternativaCorreta: "alternativaC"
        },

        {
            pergunta: "No episódio A Guerra é de Terra, o que Chaves estava tentando fazer ao espalhar terra pelo pátio da vila?",
            alternativaA: "Plantar moedas para que nascesse uma árvore de dinheiro.",
            alternativaB: "Plantar um ovo para que nascesse uma árvore de galinhas.",
            alternativaC: "Enterrar brinquedos para que ninguém os encontrasse.",
            alternativaD: "Preparar um terreno para construir uma pequena horta.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Em “O Bilhete de Loteria”, para quem Chaves vende seu último bilhete?",
            alternativaA: "Professor Girafales.",
            alternativaB: "Sr. Barriga.",
            alternativaC: "Seu Madruga.",
            alternativaD: "Dona Florinda.",
            alternativaCorreta: "alternativaC"
        },

        {
            pergunta: "No episódio “O Velho do Saco”, porque Quico fica assustado quando Seu Madruga aparece carregando uma sacola enorme?",
            alternativaA: "Porque acredita que Seu Madruga está carregando um ladrão.",
            alternativaB: "Porque pensa que ele é o Velho do Saco.",
            alternativaC: "Porque acredita que há um animal perigoso dentro da sacola.",
            alternativaD: "Porque pensa que ele está levando Chaves embora.",
            alternativaCorreta: "alternativaB"
        }

    ],

    3: [

        {
            pergunta: "De onde surgiu o apelido “Chespirito”, utilizado por Roberto Gómez Bolaños?",
            alternativaA: "Era uma homenagem ao seu primeiro personagem.",
            alternativaB: "Era uma adaptação diminutiva do sobrenome Shakespeare.",
            alternativaC: "Era o nome de um personagem que ele criou na infância.",
            alternativaD: "Era uma referência ao nome de seu primeiro programa.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Qual curso Roberto Gómez Bolaños chegou a cursar antes de trabalhar com televisão e humor?",
            alternativaA: "Jornalismo.",
            alternativaB: "Direito.",
            alternativaC: "Engenharia.",
            alternativaD: "Medicina.",
            alternativaCorreta: "alternativaC"
        },

        {
            pergunta: "Por que o título original da série era “El Chavo del Ocho”?",
            alternativaA: "Porque Chaves tinha oito anos.",
            alternativaB: "Porque o programa era exibido pelo Canal 8.",
            alternativaC: "Porque o personagem morava originalmente no apartamento 8.",
            alternativaD: "Porque havia oito personagens principais.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Qual personagem era conhecido por sempre tentar evitar a fadiga?",
            alternativaA: "Seu Madruga.",
            alternativaB: "Jaiminho.",
            alternativaC: "Professor Girafales.",
            alternativaD: "Sr. Barriga.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Qual personagem foi criado pelo próprio ator Edgar Vivar?",
            alternativaA: "Godinez.",
            alternativaB: "Nhonho.",
            alternativaC: "Jaiminho.",
            alternativaD: "Seu Furtado.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Qual é a curiosidade por trás dos sapatos usados pelo Chaves na série?",
            alternativaA: "Foram comprados por Seu Madruga em uma loja de usados.",
            alternativaB: "Foram dados por Chiquinha quando Chaves chegou à vizinhança pela primeira vez.",
            alternativaC: "Pertenciam originalmente ao Professor Girafales.",
            alternativaD: "Foram um presente de aniversário de Dona Florinda.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "O que aconteceu com a personagem Chiquinha em determinado período de 1974, fazendo com que ela se afastasse das gravações?",
            alternativaA: "A atriz precisou viajar para outro país.",
            alternativaB: "A atriz estava grávida.",
            alternativaC: "A personagem foi retirada por uma mudança no roteiro.",
            alternativaD: "A atriz sofreu um acidente durante as gravações.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Em que ano aconteceu a última participação de Quico na série clássica?",
            alternativaA: "1976.",
            alternativaB: "1977.",
            alternativaC: "1978.",
            alternativaD: "1979.",
            alternativaCorreta: "alternativaC"
        },

        {
            pergunta: "Antes de ganhar um programa próprio, Chaves era um quadro dentro de qual atração comandada por Roberto Gómez Bolaños?",
            alternativaA: "El Chapulín Colorado.",
            alternativaB: "Los Supergenios de la Mesa Cuadrada.",
            alternativaC: "Chespirito.",
            alternativaD: "La Chicharra.",
            alternativaCorreta: "alternativaC"
        },

        {
            pergunta: "Qual detalhe dos óculos de Chiquinha é uma curiosidade sobre a produção da série?",
            alternativaA: "Eram feitos com lentes de aumento.",
            alternativaB: "Na maioria dos episódios, não possuíam lentes.",
            alternativaC: "Eram pintados para combinar com o vestido.",
            alternativaD: "Tinham lentes que mudavam de cor.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Em que ano Chaves estreou na televisão mexicana?",
            alternativaA: "1969.",
            alternativaB: "1970.",
            alternativaC: "1971.",
            alternativaD: "1973.",
            alternativaCorreta: "alternativaC"
        },

        {
            pergunta: "Qual episódio é conhecido por reunir praticamente todo o elenco principal da série?",
            alternativaA: "A venda da vila.",
            alternativaB: "O Festival da Boa Vizinhança.",
            alternativaC: "A viagem a Acapulco.",
            alternativaD: "O restaurante de Dona Florinda.",
            alternativaCorreta: "alternativaB"
        },

        {
            pergunta: "Qual era o nome da cidade mexicana de onde vinha Jaiminho, o Carteiro?",
            alternativaA: "Cancún.",
            alternativaB: "Tangamandápio.",
            alternativaC: "Acapulco.",
            alternativaD: "Guadalajara.",
            alternativaCorreta: "alternativaB"
        }

    ]

};
