class Observations:
    @staticmethod
    def get_massif_snow_coverage(massif_name):
        return {
            "belledonne": {"title": "Belledonne - Isère (38)",
                           "url_week": ["https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/AIGLES.gif"],
                           "url_season": ["https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/AIGLE.gif"]
                           },

            "chartreuse": {"title": "Chartreuse - Isère (38)",
                           "url_week": ["https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/COLPOS.gif", "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/STHILS.gif"],
                           "url_season": ["https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/COLPO.gif", "https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/STHIL.gif"]
                           },

        }.get(massif_name, "-")
