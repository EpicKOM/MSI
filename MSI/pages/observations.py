class Observations:
    @staticmethod
    def get_massif_snow_coverage(massif_name):
        return {
            "belledonne": {"title": "Belledonne - Isère (38)",
                           "url_week": [
                               "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/AIGLES.gif"],
                           "url_season": [
                               "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/AIGLE.gif"]
                           },

            "chartreuse": {"title": "Chartreuse - Isère (38)",
                           "url_week": [
                               "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/COLPOS.gif",
                               "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/STHILS.gif"],
                           "url_season": [
                               "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/COLPO.gif",
                               "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/STHIL.gif"]
                           },

            "oisans": {"title": "Oisans - Isère (38)",
                       "url_week": [
                           "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/ECRINS.gif",
                           "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/MEIJES.gif"],
                       "url_season": [
                           "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/ECRIN.gif",
                           "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/MEIJE.gif"]
                       },

            "vercors": {"title": "Vercors - Isère (38)",
                        "url_week": [
                            "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/LEGUAS.gif"],
                        "url_season": [
                            "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/LEGUA.gif"]
                        },

            "bauges": {"title": "Bauges - Savoie (73)",
                       "url_week": [
                           "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/ALLANS.gif"],
                       "url_season": [
                           "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/ALLAN.gif"]
                       },

            "beaufortain": {"title": "Beaufortain - Savoie (73)",
                            "url_week": [
                                "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/PAREIS.gif"],
                            "url_season": [
                                "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/PAREI.gif"]
                            },

        }.get(massif_name, "-")
