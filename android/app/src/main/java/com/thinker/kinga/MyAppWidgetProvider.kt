package com.thinker.kinga

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import com.thinker.kinga.MyWidgetService

class MyAppWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        for (appWidgetId in appWidgetIds) {
            val views = RemoteViews(context.packageName, R.layout.widget_layout)

            // Set up intent for Button 1
            val intent1 = Intent(context, MyWidgetService::class.java).apply {
                action = "BUTTON_1_CLICK"
            }
            val pendingIntent1 = PendingIntent.getService(context, 0, intent1, PendingIntent.FLAG_UPDATE_CURRENT)
            views.setOnClickPendingIntent(R.id.button1, pendingIntent1)

            // Set up intent for Button 2
            val intent2 = Intent(context, MyWidgetService::class.java).apply {
                action = "BUTTON_2_CLICK"
            }
            val pendingIntent2 = PendingIntent.getService(context, 0, intent2, PendingIntent.FLAG_UPDATE_CURRENT)
            views.setOnClickPendingIntent(R.id.button2, pendingIntent2)

            // Set up intent for Button 3
            val intent3 = Intent(context, MyWidgetService::class.java).apply {
                action = "BUTTON_3_CLICK"
            }
            val pendingIntent3 = PendingIntent.getService(context, 0, intent3, PendingIntent.FLAG_UPDATE_CURRENT)
            views.setOnClickPendingIntent(R.id.button3, pendingIntent3)

            // Update the widget with the new configuration
            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}
