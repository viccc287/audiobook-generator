import { atom } from 'jotai';

export const pagesAtom = atom([
	{
		name: 'La llave y el candado de Itzel',
		template: 'cover',
		color: '#140F0F',
		images: { first: 'itzelcandado.png' },
		text: {
			title: 'La llave y el candado de Itzel',
			subtitle: 'Abriendo y cerrando puertas',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Prefacio',
		template: 'titleSubtitle',
		color: '#FFFFFF',
		images: {},
		text: {
			title: '¡Hola amiguitas y amiguitos!',
			subtitle:
				'Esta es la historia de lo que un día le pasó a Itzel, ella quiere contársela a todas las niñas y niños, para que al igual que ella, sepan cómo protegerse con la ayuda de las personas de su confianza y cuidarse de las personas que pueden hacerles daño, ya que aprendió que: \n\n¡De boca en boca, a mi cuerpo nadie lo toca! \n\n Para poder leer este cuento, es importante que Itzel les comparta algo muy importante que sus papás le enseñaron: existen dos herramientas de protección y cuidado para los niños y las niñas, son materiales que no pueden tocarse porque están en nuestra imaginación pero que nos alejan de situaciones que pueden ponernos en peligro o ayudarnos a estar a salvo.',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 1',
		template: 'titleTextImage',
		color: '#FFFFFF',
		images: { first: 'candado.png' },
		text: {
			title: '¿Cuáles son esas herramientas?',
			subtitle:
				'¡Son una llave y un candado! ¿Y para qué sirven estas herramientas? es muy fácil de aprender: Usamos una llave para abrir puertas, cuando abrimos una puerta podemos entrar a un lugar y quedarnos porque nos hace sentir cómodos, por eso, Itzel utiliza su propia llave para ponerse a salvo o estar en una situación que le hace sentirse a gusto. Usamos un candado para cerrar una puerta, para cerrar el paso o para alejarnos de un lugar o de personas con las que no nos sentimos a gusto. Por eso, Itzel utiliza su propio candado para ponerse a salvo del peligro. Ahora que ya conoces esto ¡Comencemos con el cuento!',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 2',
		template: 'leftTextRightImage',
		color: '#FFFFFF',
		images: { first: 'papamama.png' },
		text: {
			subtitle:
				'Era un bonito día en la casa de la familia de Itzel, una linda y alegre niña de 7 años. \nSu papá don Jorge y su mamá doña Isabel desayunaban alrededor de la mesa, mientras que Itzel platicaba con su hermana mayor llamada Montse, al mismo tiempo que se preparaba para ir a la escuela.',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 3',
		template: 'leftTextRightImage',
		color: '#FFFFFF',
		images: { first: 'itzelmonse.png' },
		text: {
			subtitle:
				'-Qué bueno que siempre me ayudas, me explicas las tareas y que todos los días me llevas hasta la escuela- Dijo Itzel a su hermana mientras ponía cara de preocupación al decir estas últimas palabras. \n\nA Montse le llamó la atención esto último y por eso le preguntó a su hermanita: -¿Hay algo que te preocupe en el camino para ir a la escuela Itzel? Recuerda que yo te quiero mucho y que puedes confiar en mí',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 4',
		template: 'leftTextRightImage',
		color: '#FFFFFF',
		images: { first: 'itzelmonsecandado.png' },
		text: {
			subtitle:
				'¿Debería Itzel utilizar una llave para abrir la puerta de la confianza a su hermana mayor, que la quiere mucho? o ¿Debe poner un candado para cerrar el paso a la comunicación con Montse?',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 5',
		template: 'textOnly',
		color: '#FFFFFF',
		images: {},
		text: {
			subtitle:
				'¡Itzel debe usar su llave de la confianza y contarle a su hermana qué es eso que le está preocupando al ir a la escuela! Porque Montse es una persona de confianza, ayuda a su hermanita siempre que puede y le ha demostrado que la quiere mucho. \nItzel le contó a su hermana, que Juan, le hacía sentir mal cuando se encontraban en la escuela porque se reía de ella cuando nadie los veía. Montse le agradeció su confianza y le aconsejó que también se lo contara a sus papás, ya que ellos como los adultos de la familia, tienen la responsabilidad de ayudar a Itzel y hacer lo necesario para que su compañero ya no la molestara.',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 6',
		template: 'textOnly',
		color: '#FFFFFF',
		images: {},
		text: {
			subtitle:
				'Ya en la escuela Itzel se encontró en el recreo a Juan, que se paró frente a ella cerrándole el paso mientras le decía a la niña: \n\n-Itzel ¡Qué fea te ves! Mejor regresa a tu casa porque si te veo en el salón después del recreo te voy a pegar-',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 7',
		template: 'textOnly',
		color: '#FFFFFF',
		images: {},
		text: {
			subtitle:
				'¿Itzel debería utilizar la llave de la confianza para hacer lo que le pide su compañero que la molesta? o ¿Debe utilizar el candado para cerrarle el paso a Juan y pedir ayuda a una persona adulta?',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 8',
		template: 'leftTextRightImage',
		color: '#FFFFFF',
		images: { first: 'juanitzel.png' },
		text: {
			subtitle:
				'Juan no tiene derecho de hablar de una forma que haga sentir mal a su compañera, por eso ¡Itzel debe utilizar su candado para cerrar el paso a esos comentarios y avisarle a una persona de confianza para que la ayuden!',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 9',
		template: 'leftTextRightImage',
		color: '#FFFFFF',
		images: { first: 'itzelmaestro.png' },
		text: {
			subtitle:
				'Itzel le contó a su maestro Enrique lo que estaba pasando con Juan y lo mal que eso la hacía sentir. \nDespués del recreo, el maestro Enrique habló con Juan sobre la importancia del respeto y le preguntó al niño: \n¿Cómo te sentirías si alguien te molestara?',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 10',
		template: 'leftTextRightImage',
		color: '#FFFFFF',
		images: { first: 'osito.png' },
		text: {
			subtitle:
				'Juan respondió que se sentiría triste, preocupado y ¡Con miedo! Al pensar lo que podía sentir, Juan le pidió disculpas a Itzel, después el maestro Enrique habló de esta situación con la mamá y el papá de Juan para que también ayudaran al niño a respetar a sus compañeras y compañeros.',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 11',
		template: 'leftTextRightImage',
		color: '#FFFFFF',
		images: { first: 'itzelhelado.png' },
		text: {
			subtitle:
				'Al terminar las clases y mientras esperaba a su mamá, don Chepo se acercó a Itzel para ofrecerle un helado mientras le decía: \n\n-Hola nenita ¿Cómo estás? Me parece que hoy es tu día de suerte. \n-Hola ¿Por qué dice que es mi día de suerte? ¡A mi me gustan las sorpresas!\n\n A Itzel le pareció agradable que don Chepo le hablara con palabras bonitas y sintió mucha curiosidad por saber qué quería decir.',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 12',
		template: 'leftTextRightImage',
		color: '#FFFFFF',
		images: { first: 'donchepo.png' },
		text: {
			subtitle:
				'-Don Chepo le sonrió y le dijo que ella le caía muy bien y que por eso podría regalarle un helado todos los días, pero sólo si ella lo acompañaba a su casa para platicar sin que nadie los viera ni lo supiera. \nMientras decía esto, don Chepo pensaba que sería muy fácil engañar a la niña para llevarla a su casa y abrazarla, aunque a ella no le gustara.\nItzel sentía que algo no estaba bien, pero también pensaba que no podía ser que un señor que le hablaba tan bonito quisiera hacerle daño.',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 13',
		template: 'textOnly',
		color: '#FFFFFF',
		images: {},
		text: {
			subtitle:
				'¿Itzel debería utilizar su llave para abrir la puerta de la confianza y aceptar la invitación para hablar de algo a escondidas? o ¿Debe rechazar esa invitación con su candado?',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 14',
		template: 'textOnly',
		color: '#FFFFFF',
		images: {},
		text: {
			subtitle:
				'¡Itzel debe usar su candado y cerrar la puerta a esta situación, porque, aunque él fue muy amable y prometió regalarle algo, ella no lo conoce y él le pide guardar un secreto! \nAdemás, no es una persona de confianza para aceptar su invitación. Itzel decidió negarse a la invitación de don Chepo, se alejó de él y esperó dentro de la escuela y a la vista de sus maestros.',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 15',
		template: 'leftTextRightImage',
		color: '#FFFFFF',
		images: { first: 'itzelmama.png' },
		text: {
			subtitle:
				'Cuando su mamá llegó por ella, Itzel le contó lo que le había sucedido con don Chepo y ella avisó a las autoridades de la escuela sobre el peligro de que una persona conocida haya invitado a Itzel a su casa. Eso ayudó a que otras niñas y niños se pusieran a salvo.',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 16',
		template: 'imageOnly',
		color: '#FFFFFF',
		images: { first: 'itzelfamilia.png' },
		text: {},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 17',
		template: 'textOnly',
		color: '#FFFFFF',
		images: {},
		text: {
			subtitle:
				'Al llegar a su casa, Itzel almorzó con su familia algo que con mucho cariño habían cocinado para ella y se acabó toda la comida. \nDespués, don Jorge el papá de Itzel dijo lo siguiente: \n\n-Tengo que salir a comprar, mientras tanto ustedes irán de visita con su mamá a la casa del tío Pancho y la tía Mari. \n\n- ¡Me encanta visitar a los tíos, porque juego con mis primas y nos divertimos mucho corriendo por todo su jardín! - Dijo Itzel muy emocionada y feliz.\n\nCuando Itzel y su hermana llegaron a casa de su tío, saludaron al entrar y enseguida corrieron en busca de sus primas para jugar y así lo hicieron hasta que llegó la hora de descansar.',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 18',
		template: 'textOnly',
		color: '#FFFFFF',
		images: {},
		text: {
			subtitle:
				'Las primas se fueron a dormir un rato, mientras que Itzel y su hermana se quedaron mirando la televisión junto al tío Pancho en el sillón y la tía Mari se quedó platicando en la sala con la mamá de Itzel. \nPasó un rato y el sueño terminó por vencer a Montse; de pronto, el tío Pancho comenzó a acariciar a Itzel de una forma que a ella le hacía sentir mal e incómoda mientras le decía que era un juego y que al final se ganaría un regalo si guardaba el secreto.\n',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 19',
		template: 'imageOnly',
		color: '#FFFFFF',
		images: { first: 'tiopancho.png' },
		text: {},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 20',
		template: 'textOnly',
		color: '#FFFFFF',
		images: {},
		text: {
			subtitle:
				'¿Itzel debe utilizar su llave y abrir la puerta para permitir que su tío la acaricie, aunque esta situación no le guste y la haga sentir mal? o ¿Debe utilizar su candado para cerrar la puerta y rechazar ese momento que no le agrada?',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 21',
		template: 'textOnly',
		color: '#FFFFFF',
		images: {},
		text: {
			subtitle:
				'Ninguna persona, aunque sea un familiar tuyo, puede pedirte que le dejes tocar tus partes privadas o alguna parte de tu cuerpo que te haga sentir incómoda, por eso ¡Itzel debe utilizar su candado y cerrar la puerta a esta situación en la que no están respetando su cuerpo!',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 22',
		template: 'leftTextRightImage',
		color: '#FFFFFF',
		images: { first: 'itzelcandado.png' },
		text: {
			subtitle:
				'Itzel se levantó del sillón y fue en busca de sus personas de confianza, por lo que despertó a su hermana Montse, le contó lo sucedido y corrieron para avisarle a su mamá. \nLos papás de Itzel avisaron a las autoridades sobre lo que su tío Pancho había hecho y pusieron a salvo a Itzel.',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 23',
		template: 'leftTextRightImage',
		color: '#FFFFFF',
		images: { first: 'itzelcandado.png' },
		text: {
			subtitle:
				'Esa misma noche, durante la cena, doña Isabel le dijo a Itzel: \n\n-Quiero felicitarte porque has sido muy valiente, estuviste en situaciones de riesgo y supiste cómo ponerte a salvo, estás creciendo y cada día aprendes a hacer muchas cosas por ti misma, también estás aprendiendo que hay situaciones en las que necesitas ayuda de las personas que te queremos y que somos tus personas de confianza',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 24',
		template: 'textOnly',
		color: '#FFFFFF',
		images: {},
		text: {
			subtitle:
				'Itzel se puso feliz al saber que estaba creciendo y que cada día aprendía cosas nuevas para protegerse. De pronto le surgió una duda y preguntó preocupada:\n\n-¿Qué hago si estoy en una situación de riesgo y ustedes no están cerca? Su hermana mayor le respondió: \n\n-Hay un número al que puedes hablar, es para momentos en los que tengas una emergencia, sólo marca al 911 desde donde sea que estés, no importa el lugar, las personas que te contesten te pueden ayudar\n',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 25',
		template: 'textOnly',
		color: '#FFFFFF',
		images: {},
		text: {
			subtitle:
				'El papá de Itzel dijo: \n\n-También puedes pedir ayuda a un adulto, aunque sea la persona de confianza de otro de tus amigos o amigas. \n\n\nDespués de eso, don Jorge y doña Isabel abrazaron a sus dos hijas.\nItzel se sentía llena del amor de su familia y pensaba en la importancia de conocer los números para llamar por alguna situación de riesgo (911), también pensó en lo bueno que es conocer a gente a las que se les puede pedir ayuda, como son los maestros, la policía, sus amigos o amigas y su familia. \nEsa noche, antes de dormir, Itzel se prometió a sí misma que le contaría a todos sus amigos y amigas lo que estaba pensando, ya que no tenía dudas de haber aprendido que...',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 26',
		template: 'textImage',
		color: '#FFFFFF',
		images: { first: 'itzelfamiliafinal.png' },
		text: {
			title: '¡De Boca en Boca, a mi Cuerpo Nadie lo Toca!',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Final',
		template: 'textOnly',
		color: '#FFFFFF',
		images: {},
		text: {
			subtitle: 'Fin.',
		},
		audios: {},
		loading: {},
	},
]);

export const displayedPageIndexAtom = atom(0);

export const apiKeyAtom = atom({
	text: 'Ok2iyhqrvNzN11NgThRDTia94cH4jA96Mwhbom5J',
	audio: 'sk_c5d9f056607e5b43bac904445842f0105160e72c47357a6b',
	image: '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',
});

export const currentPageTextAtom = atom(
	get => get(pagesAtom)[get(displayedPageIndexAtom)].text,
	(get, set, newText) => {
		const pageIndex = get(displayedPageIndexAtom);
		const pages = get(pagesAtom);
		pages[pageIndex].text = newText;
		set(pagesAtom, [...pages]);
	},
);

export const currentPageTemplateAtom = atom(
	get => get(pagesAtom)[get(displayedPageIndexAtom)].template,
	(get, set, newTemplate) => {
		const pageIndex = get(displayedPageIndexAtom);
		const pages = get(pagesAtom);
		pages[pageIndex].template = newTemplate;
		set(pagesAtom, [...pages]);
	},
);

export const currentPageNameAtom = atom(
	get => get(pagesAtom)[get(displayedPageIndexAtom)].name,
	(get, set, newName) => {
		const pageIndex = get(displayedPageIndexAtom);
		const pages = get(pagesAtom);
		pages[pageIndex].name = newName;
		set(pagesAtom, [...pages]);
	},
);

export const currentPageColorAtom = atom(
	get => get(pagesAtom)[get(displayedPageIndexAtom)].color,
	(get, set, newColor) => {
		const pageIndex = get(displayedPageIndexAtom);
		const pages = get(pagesAtom);
		pages[pageIndex].color = newColor;
		set(pagesAtom, [...pages]);
	},
);

export const currentPageImagesAtom = atom(
	get => get(pagesAtom)[get(displayedPageIndexAtom)].images,
	(get, set, newImages) => {
		const pageIndex = get(displayedPageIndexAtom);
		const pages = get(pagesAtom);
		pages[pageIndex].images = newImages;
		set(pagesAtom, [...pages]);
	},
);

export const currentPageAudiosAtom = atom(
	get => get(pagesAtom)[get(displayedPageIndexAtom)].audios,
	(get, set, newAudios) => {
		const pageIndex = get(displayedPageIndexAtom);
		const pages = get(pagesAtom);
		pages[pageIndex].audios = newAudios;
		set(pagesAtom, [...pages]);
	},
);

export const currentPageLoadingAtom = atom(
	get => get(pagesAtom)[get(displayedPageIndexAtom)].loading,
	(get, set, newLoading) => {
		const pageIndex = get(displayedPageIndexAtom);
		const pages = get(pagesAtom);
		pages[pageIndex].loading = newLoading;
		set(pagesAtom, [...pages]);
	},
);
