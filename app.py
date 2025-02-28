import ollama
import os
import discord
from discord.ext import commands
from dotenv import load_dotenv
load_dotenv()

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix="na", intents=intents)

@bot.event
async def on_ready():
    print(f"{bot.user.name} is online!")

@bot.command(name="wassup")
async def wassup(ctx):
    await ctx.send("stfu")


@bot.command(name="na")
async def na(ctx, *, message):
    
    response = ollama.chat(model='llama3', messages=[
        {
            'role': 'system',
            'content': "you are straight forward and kind + you always answers in 40 words or less ",
        },
        {
            'role': 'user',
            'content': message,
        }
    ])
    text = response['message']['content']
    with open("log.md", "a", encoding="utf-8") as file:
        file.write(f"{text}\n")
        file.write("--- \n")
    await ctx.send(response['message']['content'])


bot.run(os.getenv("DISCORD_BOT_TOKEN"))