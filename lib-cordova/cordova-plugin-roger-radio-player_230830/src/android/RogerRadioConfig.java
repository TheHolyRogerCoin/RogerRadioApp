package com.theholyroger.RogerRadioConfig;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import java.lang.reflect.Field;


public class RogerRadioConfig {
    private static String pubApiKey;
    private static String urlWs;
    private static String urlStream;

    private static Object getBuildConfigValue(
            Context context,
            String fieldName
    ) {
        try {
            Class<?> clazz = Class.forName(context.getPackageName() + ".BuildConfig");
            Field field = clazz.getField(fieldName);
            return field.get(null);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        return null;
    }

    public void clearCachedStreamUrl() {
        urlStream = null;
    }

    public String getUrlStatWs(Context context) {
        return getUrlWs(context) + "/ws_stats_public/all_public_stats?pub-api-key=" + getApiKey(context);
    }

    public String getApiKey(Context context) {
        if (pubApiKey == null) {
            pubApiKey = (String) getBuildConfigValue(context, "PUB_API_KEY");
        }
        return pubApiKey;
    }

    public String getUrlWs(Context context) {
        if (urlWs == null) {
            urlWs = (String) getBuildConfigValue(context, "URL_WS");
        }
        return urlWs;
    }

    public String getUrlStream(Context context) {
        if (urlStream == null) {
            try {
                SharedPreferences pref = context
                        .getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);
                if (pref != null) {
                    String quality_setting = pref.getString("quality", null);
                    switch (quality_setting) {
                        case "mp3_max":
                            urlStream = (String) getBuildConfigValue(context, "URL_STREAM_MP3_MAX");
                            break;
                        case "mp3_med":
                            urlStream = (String) getBuildConfigValue(context, "URL_STREAM_MP3_MED");
                            break;
                        case "mp3_trash":
                            urlStream = (String) getBuildConfigValue(context, "URL_STREAM_MP3_TRASH");
                            break;
                        default:
                            break;
                    }
                }
            } catch (Exception e) {
                Log.e("RRC", "Error fetching pref");
                e.printStackTrace();
            }
            if (urlStream == null) {
                urlStream = (String) getBuildConfigValue(context, "URL_STREAM_MP3_MAX");
            }
        }
        return urlStream;
    }
}
