package com.theholyroger.RogerRadioConfig;

import android.content.Context;
import java.lang.reflect.Field;


public class RogerRadioConfig {
    private static String pubApiKey;
    private static String urlWs;
    private static String urlStream;

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
            urlStream = (String) getBuildConfigValue(context, "URL_STREAM");
        }
        return urlStream;
    }

    private static Object getBuildConfigValue(Context context, String fieldName) {
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
}
