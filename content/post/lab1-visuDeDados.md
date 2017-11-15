---
title: "Três visualizações sobre Boqueirão"
date: 2017-11-15T16:37:49-03:00
draft: false
---

Vamos analisar o comportamento do açude de Boqueirão com o uso de 3 visualizações, usando os dados do monitoramento da INSA e com auxilia da ferramenta Vega-lite.

Começarei analisando o volume máximo e mínimo dos anos no reservátorio de Boqueirão, pode ser uma forma interessante de descobrir como o volume do açude se comporta durante o ano.

<div id="vis1" width=640></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>
<script>
    const spec1 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
    "description": "Análise dos volumes máximos e mínimos do reservatório ao longo dos anos.",
    "data": {
        "url": "https://api.insa.gov.br/reservatorios/12172/monitoramento",
        "format": {
            "type": "json",
            "property": "volumes",
            "parse": {
                "DataInformacao": "utc:%d/%m/%Y"
            }
        }
    },
    "vconcat": [{
            "width": 640,
            "height": 200,
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "DataInformacao",
                    "type": "temporal",
                    "axis": {
                        "title": "Volume máximo ao longo dos anos"
                    },
                    "timeUnit": "year"
                },
                "y": {
                    "aggregate": "max",
                    "field": "VolumePercentual",
                    "type": "quantitative",
                    "axis": {
                        "title": "Volume Percentual"
                    },
                    "scale": {
                        "domain": [0,110]
                    }
                },
                "color": {
                    "value": "#82d664"
                }
            }
  },
        {
            "width": 640,
            "height": 200,
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "DataInformacao",
                    "type": "temporal",
                    "axis": {
                        "title": "Volume mínimo ao longo dos anos"
                    },
                    "timeUnit": "year"
                },
                "y": {
                    "aggregate": "min",
                    "field": "VolumePercentual",
                    "type": "quantitative",
                    "axis": {
                        "title": "Volume Percentual"
                    },
                    "scale": {
                        "domain": [0,110]
                    }
                },
                "color": {
                    "value": "#d66464"
                }
            }
  }]
};
  	vegaEmbed('#vis1', spec1).catch(console.warn);
</script>

Vejamos. É possível notar rapidamente que o reservatório passou por outros periodos onde atingiu niveis críticos, entre 1998 e 2004. Além disso, é visível que a ultima seca que passamos foi realmente a mais forte presente nos dados. Foi atingindo incríveis 2.9% da capacidade total em 2017, enquanto que na crise anterior o minimo atingido foi de 14.9%. Quem residiu na cidade no ano de 2017 passou por periodos com mais de 5 dias de racionamento durante a semana!

Apesar das situações críticas, nem tudo é tristeza. Na visualização dos máximos é possível notar os anos onde o açude atingiu valores maiores que sua capacidade total, ou como se fala no Nordeste, o açude *sangrou* nos anos de 2008, 2009 e 2011. Após 2011, o volume do reservatório vem diminuindo em relação ao ano anterior.

Vimos o volume do açude ao longo dos anos (seus máximos e mínimos) e notamos que ele varia bastante, porém como será que o volume se comporta **durantes os meses de um ano?** Para responder essa pergunta usarei uma visualização com a mediana do volume durante os meses.

<div id="vis2" width=640></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>
<script>
    const spec2 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
    "description": "Analisando o valor mediano do volume de Boqueirão ao longo dos meses.",
    "width": 640,
    "data": {
        "url": "https://api.insa.gov.br/reservatorios/12172/monitoramento",
        "format": {
            "type": "json",
            "property": "volumes",
            "parse": {
                "DataInformacao": "utc:%d/%m/%Y"
            }
        }
    },
    "layer": [
        {
            "mark": {
                "type": "line"
            },
            "encoding": {
                "x": {
                    "field": "DataInformacao",
                    "type": "temporal",
                    "timeUnit": "month",
                    "axis": {"title": "Meses do ano."}
                },
                "y": {
                    "field": "Volume",
                    "type": "quantitative",
                    "aggregate": "median",
                    "axis": {"title": "Mediana do volume"}
                },
                "size": {
                    "value": 2
                }
            }
        },
        {
            "mark": "rule",
            "encoding": {
                "y": {
                    "aggregate": "median",
                    "field": "Volume",
                    "type": "quantitative",
                    "axis": {"title": "Mediana do volume"}
                },
                "color": {
                    "value": "red"
                },
                "size": {
                    "value": 2
                }
            }
        }
    ]
};
    vegaEmbed('#vis2', spec2).catch(console.warn);
</script>

O comportamento durante os meses do ano é menos variante que durante os anos, como analisamos anteriormente. Apesar disso podemos tirar uma informação importante da visualização, o volume do açude só aumenta durante o **inverno!** e começo do outono. Entre os meses de julho e outubro o volume do açude aumenta devido as chuvas, principalmente entre agosto e setembro, onde o volume do reservatório ultrapassa a sua mediana durante o ano. Após outubro o volume do açude só diminui e entre fevereiro e abril ele perde a maior quantidade de água, onde o volume sobrepassa sua mediana durante o ano. Além disso, entre outubro e janeiro, o volume do açude não diminui com muita intensidade, pois o clima é ameno (em relação ao verão) e ainda ocorrem chuvas ocasionais.

Até agora analisamos o comportamento do reservatório de forma natural ~ou não se levarmos em conta que estamos destruindo o planeta~.  Recentemente ocorreu a transposição do Rio São Francisco para muitos estados do Nordeste, uma obra que vinha se arrastando por anos e anos, com isso um grande volume de água começou a entrar no açude de Boqueirão de uma forma que não relacionada a chuvas. Vamos dar uma analisada nesse ocorrido utilizando uma visualização com a marca de área e de forma interativa (é possível selecionar o período no gráfico mais claro).

<div id="vis3" width=640></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>
<script>
    const spec3 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
    "description": "Análise do volume no reservatório após a transposição.",
    "data": {
        "url": "https://api.insa.gov.br/reservatorios/12172/monitoramento",
        "format": {
            "type": "json",
            "property": "volumes",
            "parse": {
                "DataInformacao": "utc:%d/%m/%Y"
            }
        }
    },
    "transform": [
        {
            "filter": {
                "field": "DataInformacao",
                "timeUnit": "year",
                "range": [2016, 2018]
            }
        }
    ],
    "vconcat": [
        {
            "width": 640,
            "mark": "area",
            "encoding": {
                "x": {
                    "field": "DataInformacao",
                    "type": "temporal",
                    "timeUnit": "utcyearmonthdate",
                    "axis": {
                        "title": "Período detalhado",
                        "grid": false
                    },
                    "scale": {
                        "domain": {
                            "selection": "brush"
                        }
                    }
                },
                "y": {
                    "field": "Volume",
                    "type": "quantitative",
                    "axis": {
                        "title": "Volume"
                    }
                },
                "color": {
                    "value": "#294cc6"
                }
            }
        },
        {
            "width": 640,
            "height": 60,
            "mark": "area",
            "selection": {
                "brush": {
                    "type": "interval",
                    "encodings": ["x"]
                }
            },
            "encoding": {
                "x": {
                    "field": "DataInformacao",
                    "type": "temporal",
                    "axis": {
                        "title": "Volume antes e depois da transposição"
                    }
                },
                "y": {
                    "field": "Volume",
                    "type": "quantitative",
                    "axis": {
                        "tickCount": 3,
                        "grid": false
                    }
                },
                "color": {
                    "value": "#29a9c6"
                }
            }
        }
    ]
};
    vegaEmbed('#vis3', spec3).catch(console.warn);
</script>

Logo de cara percebemos quando ocorreu a transposição, em abril de 2017, devido ao notável crescimento do volume do reservatório após  esse mês. Se selecionarmos a partir de abril, veremos que inicialmente tivemos uma maior quantidad de água entrando no açude e, ao poucos, essa vazão foi diminuindo. É importante dizer que pouco tempo após a transposição tivemos o fim do racionamento de água em muitas cidades paraibanas, mais precisamente em 25 de agosto de 2017. Isso impactou a quantida de água no açude diratamente, pois entre abril e agosto tivemos um aumento de cerca de 5% (de 3% para 8% da capacidade total), mas entre agosto e novembro tivemos um aumento de apenas 1% na capacidade total.

Acredito que o racionamento não deveria ter sido encerrado por completo, pois apesar de estar entrando água no açude devido a transposição, o volume do açude ainda está muito baixo (apenas 9% da capacidade total). Além disso, como analisamos anteriormente, o período onde o volume do açude aumenta é entre julho e outubro (**inverno**), será que o açude continuará com seu volume subindo daqui a 7 meses? É algo que preocupa a vida dos paraibanos que são abastecidos pelo açude de Boqueirão.
